// backend/services/eventResultService.js
// Service layer for Event Results (organizer CRUD, participant view)

import { getConnection } from '../config/database.js';

/** Publish multiple results for an event (organizer) */
export async function publishResults(eventId, results) {
  const conn = await getConnection();
  try {
    await conn.beginTransaction();
    // Insert each result; ensure rank uniqueness via DB constraint
    const insertSql = `INSERT INTO event_results (event_id, participant_id, team_id, rank, score)
                      VALUES (?, ?, ?, ?, ?)`;
    for (const r of results) {
      const { participantId = null, teamId = null, rank, score = null } = r;
      await conn.execute(insertSql, [eventId, participantId, teamId, rank, score]);
    }
    await conn.commit();
    return { success: true };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

/** Update a single result */
export async function updateResult(resultId, { participantId, teamId, rank, score }) {
  const conn = await getConnection();
  try {
    const [res] = await conn.execute(
      `UPDATE event_results SET participant_id = ?, team_id = ?, rank = ?, score = ? WHERE id = ?`,
      [participantId ?? null, teamId ?? null, rank, score ?? null, resultId]
    );
    return { affectedRows: res.affectedRows };
  } finally {
    conn.release();
  }
}

/** Delete a result */
export async function deleteResult(resultId) {
  const conn = await getConnection();
  try {
    const [res] = await conn.execute(`DELETE FROM event_results WHERE id = ?`, [resultId]);
    return { affectedRows: res.affectedRows };
  } finally {
    conn.release();
  }
}

/** Get results for an event (public view) */
export async function getResults(eventId) {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      `SELECT er.id, er.rank, er.score,
              s.user_id AS participant_id, s.first_name, s.last_name,
              t.id AS team_id, t.name AS team_name
       FROM event_results er
       LEFT JOIN students s ON er.participant_id = s.user_id
       LEFT JOIN teams t ON er.team_id = t.id
       WHERE er.event_id = ?
       ORDER BY er.rank ASC`,
      [eventId]
    );
    return rows;
  } finally {
    conn.release();
  }
}

/** Get rankings (just ranks and names) */
export async function getRankings(eventId) {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      `SELECT er.rank,
              COALESCE(CONCAT(s.first_name, ' ', s.last_name), t.name) AS name,
              er.score
       FROM event_results er
       LEFT JOIN students s ON er.participant_id = s.user_id
       LEFT JOIN teams t ON er.team_id = t.id
       WHERE er.event_id = ?
       ORDER BY er.rank ASC`,
      [eventId]
    );
    return rows;
  } finally {
    conn.release();
  }
}
