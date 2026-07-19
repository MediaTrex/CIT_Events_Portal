// backend/services/dashboardService.js
// Service layer for dashboard analytics (cards and chart data)

import { getConnection } from '../config/database.js';

/** Helper to format chart data */
function formatChartData(labels, values) {
  return { labels, datasets: [{ data: values }] };
}

/** Student dashboard */
export async function getStudentDashboard(studentId) {
  const conn = await getConnection();
  try {
    // Upcoming events where student is registered and start_date > now
    const [upcoming] = await conn.execute(
      `SELECT e.id, e.title, e.start_date, e.end_date, e.is_online, e.is_paid, e.price_cents
       FROM registrations r
       JOIN events e ON r.event_id = e.id
       WHERE r.student_id = ? AND e.start_date > NOW()
       ORDER BY e.start_date ASC`,
      [studentId]
    );
    // Teams where student is captain or member
    const [teams] = await conn.execute(
      `SELECT t.id, t.name, t.event_id, e.title AS event_title, t.captain_student_id
       FROM teams t
       LEFT JOIN team_members tm ON t.id = tm.team_id
       JOIN events e ON t.event_id = e.id
       WHERE t.captain_student_id = ? OR tm.student_id = ?
       GROUP BY t.id`,
      [studentId, studentId]
    );
    // Certificates earned
    const [certificates] = await conn.execute(
      `SELECT c.id, c.certificate_url, c.issue_date, e.title AS event_title
       FROM certificates c
       JOIN registrations r ON c.registration_id = r.id
       JOIN events e ON r.event_id = e.id
       WHERE r.student_id = ?`,
      [studentId]
    );
    // Notification counts
    const [[unreadRes]] = await conn.execute(
      `SELECT COUNT(*) AS unread FROM notifications WHERE user_id = ? AND is_read = FALSE`,
      [studentId]
    );
    const unreadCount = unreadRes?.unread || 0;
    const [recentNotifications] = await conn.execute(
      `SELECT id, type, title, created_at FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 5`,
      [studentId]
    );
    return {
      cards: {
        upcomingEvents: upcoming.length,
        teams: teams.length,
        certificates: certificates.length,
        unreadNotifications: unreadCount,
      },
      data: {
        upcomingEvents: upcoming,
        teams,
        certificates,
        recentNotifications,
      },
    };
  } finally {
    conn.release();
  }
}

/** Organizer dashboard */
export async function getOrganizerDashboard(organizerId) {
  const conn = await getConnection();
  try {
    const [events] = await conn.execute(
      `SELECT id, title, status, start_date, is_paid, price_cents FROM events WHERE organizer_id = ?`,
      [organizerId]
    );
    const [[revRes]] = await conn.execute(
      `SELECT COALESCE(SUM(p.amount_cents),0) AS totalRevenueCents
       FROM payments p
       JOIN registrations r ON p.registration_id = r.id
       JOIN events e ON r.event_id = e.id
       WHERE e.organizer_id = ? AND e.is_paid = TRUE AND p.status = 'completed'`,
      [organizerId]
    );
    const totalRevenueCents = revRes?.totalRevenueCents || 0;
    const [regRows] = await conn.execute(
      `SELECT e.id, e.title, COUNT(r.id) AS registrations
       FROM events e
       LEFT JOIN registrations r ON e.id = r.event_id
       WHERE e.organizer_id = ?
       GROUP BY e.id, e.title`,
      [organizerId]
    );
    const registrationsChart = formatChartData(
      regRows.map(r => r.title),
      regRows.map(r => Number(r.registrations))
    );
    const [revRows] = await conn.execute(
      `SELECT DATE_FORMAT(p.created_at, '%Y-%m') AS month, COALESCE(SUM(p.amount_cents),0) AS total_cents
       FROM payments p
       JOIN registrations r ON p.registration_id = r.id
       JOIN events e ON r.event_id = e.id
       WHERE e.organizer_id = ? AND p.status = 'completed'
       GROUP BY month
       ORDER BY month`,
      [organizerId]
    );
    const revenueChart = formatChartData(
      revRows.map(r => r.month),
      revRows.map(r => Number(r.total_cents))
    );
    return {
      cards: {
        eventsCreated: events.length,
        totalRevenueCents,
        totalRegistrations: regRows.reduce((s, r) => s + Number(r.registrations), 0),
      },
      charts: {
        registrationsPerEvent: registrationsChart,
        revenueOverTime: revenueChart,
      },
      data: { events, regRows, revRows },
    };
  } finally {
    conn.release();
  }
}

/** Admin dashboard */
export async function getAdminDashboard() {
  const conn = await getConnection();
  try {
    const [userRows] = await conn.execute(`SELECT role, COUNT(*) AS count FROM users GROUP BY role`);
    const usersByRole = userRows.reduce((a, c) => { a[c.role] = Number(c.count); return a; }, {});
    const [eventRows] = await conn.execute(`SELECT status, COUNT(*) AS count FROM events GROUP BY status`);
    const eventsByStatus = eventRows.reduce((a, c) => { a[c.status] = Number(c.count); return a; }, {});
    const [[revRes]] = await conn.execute(`SELECT COALESCE(SUM(p.amount_cents),0) AS totalRevenueCents FROM payments p WHERE p.status = 'completed'`);
    const totalRevenueCents = revRes?.totalRevenueCents || 0;
    const [monthlyRows] = await conn.execute(
      `SELECT DATE_FORMAT(p.created_at, '%Y-%m') AS month, COALESCE(SUM(p.amount_cents),0) AS revenue
       FROM payments p
       WHERE p.status = 'completed' AND p.created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
       GROUP BY month
       ORDER BY month`
    );
    const revenueChart = formatChartData(
      monthlyRows.map(r => r.month),
      monthlyRows.map(r => Number(r.revenue))
    );
    const [organizerRows] = await conn.execute(
      `SELECT u.id, u.email, COUNT(e.id) AS eventsCreated
       FROM users u
       LEFT JOIN organizers o ON u.id = o.user_id
       LEFT JOIN events e ON e.organizer_id = u.id
       WHERE u.role = 'organizer'
       GROUP BY u.id, u.email`
    );
    return {
      cards: {
        totalUsers: Object.values(usersByRole).reduce((a, b) => a + b, 0),
        totalOrganizers: usersByRole.organizer || 0,
        totalEvents: Object.values(eventsByStatus).reduce((a, b) => a + b, 0),
        totalRevenueCents,
      },
      charts: { revenueOverTime: revenueChart },
      data: { usersByRole, eventsByStatus, monthlyRevenue: monthlyRows, organizers: organizerRows },
    };
  } finally {
    conn.release();
  }
}
