// backend/services/teamInviteService.js
// Service layer for Team Invitation Management

import { getConnection } from '../config/database.js';
import { isCaptain } from './teamService.js';

/**
 * Send an invitation from captain to another student.
 * @param {number} teamId - ID of the team.
 * @param {number} senderId - Student ID of the captain (must be captain).
 * @param {number} receiverId - Student ID of the invited student.
 * @returns {Promise<Object>} Inserted invitation record.
 */
export async function sendInvite(teamId, senderId, receiverId) {
  const conn = await getConnection();
  try {
    // Verify sender is captain of the team
    const captain = await isCaptain(teamId, senderId);
    if (!captain) {
      throw new Error('Only the team captain can send invitations');
    }
    // Ensure the receiver exists
    const [studentRows] = await conn.execute(
      'SELECT user_id FROM students WHERE user_id = ?',
      [receiverId]
    );
    if (!studentRows.length) {
      throw new Error('Invited student does not exist');
    }
    // Insert invitation
    const [result] = await conn.execute(
      `INSERT INTO team_invites (team_id, sender_student_id, receiver_student_id)
       VALUES (?, ?, ?)`,
      [teamId, senderId, receiverId]
    );
    const inviteId = result.insertId;
    // Optionally create a notification for the receiver (handled elsewhere if needed)
    return { inviteId, teamId, senderId, receiverId, status: 'pending' };
  } finally {
    conn.release();
  }
}

/**
 * Respond to an invitation (accept or reject).
 * @param {number} inviteId - ID of the invitation.
 * @param {number} responderId - Student ID responding (must match receiver).
 * @param {string} response - 'accepted' or 'rejected'.
 */
export async function respondToInvite(inviteId, responderId, response) {
  if (!['accepted', 'rejected'].includes(response)) {
    throw new Error('Invalid response value');
  }
  const conn = await getConnection();
  try {
    await conn.beginTransaction();
    // Fetch invitation
    const [invRows] = await conn.execute(
      `SELECT team_id, receiver_student_id, status FROM team_invites WHERE id = ? FOR UPDATE`,
      [inviteId]
    );
    if (!invRows.length) {
      throw new Error('Invitation not found');
    }
    const invite = invRows[0];
    if (invite.receiver_student_id !== responderId) {
      throw new Error('Only the invited student can respond to this invitation');
    }
    if (invite.status !== 'pending') {
      throw new Error('Invitation has already been responded to');
    }
    // Update status
    await conn.execute(
      `UPDATE team_invites SET status = ? WHERE id = ?`,
      [response, inviteId]
    );
    if (response === 'accepted') {
      // Insert into team_members
      await conn.execute(
        'INSERT INTO team_members (team_id, student_id) VALUES (?, ?)',
        [invite.team_id, responderId]
      );
    }
    await conn.commit();
    return { inviteId, response };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
