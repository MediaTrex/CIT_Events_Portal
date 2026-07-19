// backend/services/participantService.js
// Service layer for Participant Management (Organizer APIs)

import { getConnection } from '../config/database.js';

/**
 * Get participants (students) for an event with pagination and optional search.
 * @param {number} eventId
 * @param {object} options { limit, offset, search }
 * @returns {Promise<Array>} participant rows
 */
export async function getParticipants(eventId, { limit = 20, offset = 0, search = '' } = {}) {
  const conn = await getConnection();
  try {
    const searchTerm = `%${search}%`;
    const [rows] = await conn.execute(
      `SELECT s.*, r.status as registration_status, r.id as registration_id
       FROM registrations r
       JOIN students s ON r.student_id = s.user_id
       WHERE r.event_id = ?
         AND ( ? = '' OR s.first_name LIKE ? OR s.last_name LIKE ? OR s.email LIKE ? )
       ORDER BY r.created_at DESC
       LIMIT ? OFFSET ?`,
      [eventId, search, searchTerm, searchTerm, searchTerm, limit, offset]
    );
    return rows;
  } finally {
    conn.release();
  }
}

/** Export participants for an event as CSV string */
export async function exportParticipantsCSV(eventId) {
  const participants = await getParticipants(eventId, { limit: 10000, offset: 0, search: '' });
  const headers = ['user_id', 'first_name', 'last_name', 'email', 'registration_status'];
  const rows = participants.map(p => [p.user_id, p.first_name, p.last_name, p.email, p.registration_status]);
  const csvLines = [headers.join(','), ...rows.map(r => r.map(v => (v ?? '').toString().replace(/"/g, '""')).join(','))];
  return csvLines.join('\n');
}

/** Get payment status for a specific registration */
export async function getPaymentStatus(registrationId) {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      `SELECT p.id, p.status, p.amount_cents, p.currency, p.provider, p.provider_transaction_id, p.created_at
       FROM payments p
       WHERE p.registration_id = ? ORDER BY p.created_at DESC LIMIT 1`,
      [registrationId]
    );
    return rows[0] || null;
  } finally {
    conn.release();
  }
}

/** Get teams for an event */
export async function getTeams(eventId) {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      `SELECT t.* FROM teams t WHERE t.event_id = ?`,
      [eventId]
    );
    return rows;
  } finally {
    conn.release();
  }
}

/** Get registrations for an event */
export async function getRegistrations(eventId) {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      `SELECT * FROM registrations WHERE event_id = ? ORDER BY created_at DESC`,
      [eventId]
    );
    return rows;
  } finally {
    conn.release();
  }
}
