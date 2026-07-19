// backend/services/teamService.js
// Service layer for Team Management (MVC)

import { getConnection } from '../config/database.js';

/** Helper to check if a user is the captain of a team */
export async function isCaptain(teamId, userId) {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      'SELECT captain_student_id FROM teams WHERE id = ?',
      [teamId]
    );
    if (!rows.length) return false;
    return rows[0].captain_student_id === userId;
  } finally {
    conn.release();
  }
}

/** Create a new team */
export async function createTeam({ eventId, name, captainId }) {
  const conn = await getConnection();
  try {
    await conn.beginTransaction();
    // Ensure event exists and retrieve max team size
    const [eventRows] = await conn.execute(
      'SELECT max_team_size FROM events WHERE id = ?',
      [eventId]
    );
    if (!eventRows.length) {
      throw new Error('Event not found');
    }
    const maxTeamSize = eventRows[0].max_team_size || 1;

    // Insert team
    const [teamResult] = await conn.execute(
      'INSERT INTO teams (event_id, name, captain_student_id) VALUES (?, ?, ?)',
      [eventId, name, captainId]
    );
    const teamId = teamResult.insertId;

    // Add captain as first member (optional but makes queries easier)
    await conn.execute(
      'INSERT INTO team_members (team_id, student_id) VALUES (?, ?)',
      [teamId, captainId]
    );

    await conn.commit();
    return { teamId, eventId, name, captainId, maxTeamSize };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

/** Retrieve a team with its members */
export async function getTeam(teamId) {
  const conn = await getConnection();
  try {
    const [teamRows] = await conn.execute(
      'SELECT * FROM teams WHERE id = ?',
      [teamId]
    );
    if (!teamRows.length) {
      throw new Error('Team not found');
    }
    const team = teamRows[0];

    const [memberRows] = await conn.execute(
      `SELECT tm.student_id, s.first_name, s.last_name, s.college_id
       FROM team_members tm
       JOIN students s ON tm.student_id = s.user_id
       WHERE tm.team_id = ?`,
      [teamId]
    );
    team.members = memberRows;
    return team;
  } finally {
    conn.release();
  }
}

/** Update team details (only name can be changed for now) */
export async function updateTeam(teamId, updates, requesterId) {
  const conn = await getConnection();
  try {
    const captain = await isCaptain(teamId, requesterId);
    if (!captain) {
      throw new Error('Only the team captain can update the team');
    }
    const fields = [];
    const values = [];
    if (updates.name) {
      fields.push('name = ?');
      values.push(updates.name);
    }
    if (fields.length === 0) {
      throw new Error('No valid fields to update');
    }
    values.push(teamId);
    await conn.execute(
      `UPDATE teams SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`,
      values
    );
    return { teamId, updatedFields: updates };
  } finally {
    conn.release();
  }
}

/** Delete a team */
export async function deleteTeam(teamId, requesterId) {
  const conn = await getConnection();
  try {
    const captain = await isCaptain(teamId, requesterId);
    if (!captain) {
      throw new Error('Only the team captain can delete the team');
    }
    await conn.execute('DELETE FROM teams WHERE id = ?', [teamId]);
    // team_members rows cascade via FK (ON DELETE CASCADE)
    return { teamId };
  } finally {
    conn.release();
  }
}

/** Add a member to a team */
export async function addMember(teamId, studentId, requesterId) {
  const conn = await getConnection();
  try {
    // Verify captain
    const captain = await isCaptain(teamId, requesterId);
    if (!captain) {
      throw new Error('Only the team captain can add members');
    }
    // Ensure student exists
    const [studentRows] = await conn.execute(
      'SELECT user_id FROM students WHERE user_id = ?',
      [studentId]
    );
    if (!studentRows.length) {
      throw new Error('Student not found');
    }
    // Check if already a member
    const [existing] = await conn.execute(
      'SELECT 1 FROM team_members WHERE team_id = ? AND student_id = ?',
      [teamId, studentId]
    );
    if (existing.length) {
      throw new Error('Student is already a member of this team');
    }
    // Check max team size against event setting
    const [eventRows] = await conn.execute(
      `SELECT e.max_team_size FROM events e
       JOIN teams t ON t.event_id = e.id
       WHERE t.id = ?`,
      [teamId]
    );
    const maxSize = eventRows[0]?.max_team_size || 1;
    const [countRows] = await conn.execute(
      'SELECT COUNT(*) as cnt FROM team_members WHERE team_id = ?',
      [teamId]
    );
    const currentCount = countRows[0].cnt;
    if (currentCount + 1 > maxSize) {
      throw new Error('Team size exceeds the maximum allowed for this event');
    }
    // Insert member
    await conn.execute(
      'INSERT INTO team_members (team_id, student_id) VALUES (?, ?)',
      [teamId, studentId]
    );
    return { teamId, studentId };
  } finally {
    conn.release();
  }
}

/** Remove a member from a team */
export async function removeMember(teamId, studentId, requesterId) {
  const conn = await getConnection();
  try {
    const captain = await isCaptain(teamId, requesterId);
    if (!captain) {
      throw new Error('Only the team captain can remove members');
    }
    // Prevent removing the captain themselves (captain must transfer before leaving)
    const [teamRows] = await conn.execute(
      'SELECT captain_student_id FROM teams WHERE id = ?',
      [teamId]
    );
    if (teamRows.length && teamRows[0].captain_student_id === studentId) {
      throw new Error('Cannot remove the captain from the team');
    }
    const [result] = await conn.execute(
      'DELETE FROM team_members WHERE team_id = ? AND student_id = ?',
      [teamId, studentId]
    );
    if (result.affectedRows === 0) {
      throw new Error('Member not found in team');
    }
    return { teamId, studentId };
  } finally {
    conn.release();
  }
}
