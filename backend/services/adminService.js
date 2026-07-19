// backend/services/adminService.js
// Business logic for Admin operations, including organizer approval workflow

import { getConnection } from '../config/database.js';

/** Get all organizers joined with profile details */
export async function getOrganizers() {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(`
      SELECT 
        u.id, 
        u.email, 
        u.role, 
        u.status,
        u.created_at as createdAt,
        o.first_name as firstName,
        o.last_name as lastName,
        o.department,
        o.profile_pic_url as profilePicUrl
      FROM users u
      INNER JOIN organizers o ON u.id = o.user_id
      WHERE u.role = 'organizer'
      ORDER BY u.id
    `);
    return rows;
  } finally {
    conn.release();
  }
}

/** Approve an organizer */
export async function approveOrganizer(id) {
  const conn = await getConnection();
  try {
    const [result] = await conn.execute(
      "UPDATE users SET status = 'approved', updated_at = NOW() WHERE id = ? AND role = 'organizer'",
      [id]
    );
    if (result.affectedRows === 0) {
      throw new Error('Organizer not found');
    }
  } finally {
    conn.release();
  }
}

/** Reject an organizer */
export async function rejectOrganizer(id) {
  const conn = await getConnection();
  try {
    const [result] = await conn.execute(
      "UPDATE users SET status = 'rejected', updated_at = NOW() WHERE id = ? AND role = 'organizer'",
      [id]
    );
    if (result.affectedRows === 0) {
      throw new Error('Organizer not found');
    }
  } finally {
    conn.release();
  }
}
