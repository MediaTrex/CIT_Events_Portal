// backend/services/announcementService.js
// Announcement Service (MVC)

import { getConnection } from '../config/database.js';
import { createNotification } from './notificationService.js';

/**
 * Create a new announcement and notify all students.
 * @param {Object} params
 * @param {number} params.creatorId - Admin or Organizer user ID
 * @param {string} params.title
 * @param {string} params.body
 */
export async function createAnnouncement({ creatorId, title, body }) {
  const conn = await getConnection();
  try {
    await conn.beginTransaction();
    const [annResult] = await conn.execute(
      `INSERT INTO announcements (creator_user_id, title, body) VALUES (?, ?, ?);`,
      [creatorId, title, body]
    );
    const announcementId = annResult.insertId;
    // Fetch all student user IDs
    const [students] = await conn.execute(`SELECT id FROM users WHERE role = 'student';`);
    const notifications = students.map((s) =>
      createNotification({
        userId: s.id,
        type: 'announcement',
        title,
        body,
        url: `/announcements/${announcementId}`,
      })
    );
    // Run notifications in parallel (they each acquire a connection)
    await Promise.all(notifications);
    await conn.commit();
    const [rows] = await conn.execute('SELECT * FROM announcements WHERE id = ?', [announcementId]);
    return rows[0];
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

/** Update an existing announcement */
export async function updateAnnouncement(announcementId, { title, body }) {
  const conn = await getConnection();
  const [result] = await conn.execute(
    `UPDATE announcements SET title = ?, body = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?;`,
    [title, body, announcementId]
  );
  conn.release();
  return result.affectedRows;
}

/** Delete an announcement */
export async function deleteAnnouncement(announcementId) {
  const conn = await getConnection();
  const [result] = await conn.execute('DELETE FROM announcements WHERE id = ?;', [announcementId]);
  conn.release();
  return result.affectedRows;
}

/** Get list of announcements */
export async function listAnnouncements(limit = 20, offset = 0) {
  const conn = await getConnection();
  const [rows] = await conn.execute(
    `SELECT * FROM announcements ORDER BY created_at DESC LIMIT ? OFFSET ?;`,
    [limit, offset]
  );
  conn.release();
  return rows;
}
