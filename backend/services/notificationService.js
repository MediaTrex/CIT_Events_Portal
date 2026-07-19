// backend/services/notificationService.js
// Reusable Notification Service (MVC)

import { getConnection } from '../config/database.js';

/**
 * Create a new notification for a user.
 * @param {Object} params
 * @param {number} params.userId - Recipient user ID
 * @param {string} params.type - One of 'team_invite','event_reminder','announcement','payment_success','result_published'
 * @param {string} params.title - Short title
 * @param {string} [params.body] - Detailed body (optional)
 * @param {string} [params.url] - URL to navigate when clicked (optional)
 * @returns {Promise<Object>} Inserted notification record
 */
export async function createNotification({ userId, type, title, body = null, url = null }) {
  const conn = await getConnection();
  try {
    const [result] = await conn.execute(
      `INSERT INTO notifications (user_id, type, title, body, url) VALUES (?, ?, ?, ?, ?);`,
      [userId, type, title, body, url]
    );
    const id = result.insertId;
    const [rows] = await conn.execute('SELECT * FROM notifications WHERE id = ?', [id]);
    return rows[0];
  } finally {
    conn.release();
  }
}

/** Mark a notification as read */
export async function markAsRead(notificationId) {
  const conn = await getConnection();
  try {
    await conn.execute('UPDATE notifications SET is_read = TRUE WHERE id = ?', [notificationId]);
    const [rows] = await conn.execute('SELECT * FROM notifications WHERE id = ?', [notificationId]);
    return rows[0];
  } finally {
    conn.release();
  }
}

/** Get paginated notifications for a user */
export async function getUserNotifications(userId, limit = 20, offset = 0) {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?;`,
      [userId, limit, offset]
    );
    return rows;
  } finally {
    conn.release();
  }
}

/** Get count of unread notifications for a user */
export async function getUnreadCount(userId) {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      `SELECT COUNT(*) as unread FROM notifications WHERE user_id = ? AND is_read = FALSE;`,
      [userId]
    );
    return rows[0].unread;
  } finally {
    conn.release();
  }
}
