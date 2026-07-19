// backend/services/registrationService.js
// Service layer for Event Registration (MVC)

import { getConnection } from '../config/database.js';
import { isCaptain } from './teamService.js';

/**
 * Register an individual student for an event.
 * Validations: deadline, duplicate registration, available slots.
 */
export async function registerIndividual(eventId, studentId) {
  const conn = await getConnection();
  try {
    await conn.beginTransaction();

    // Fetch event details
    const [eventRows] = await conn.execute(
      `SELECT registration_deadline FROM events WHERE id = ? FOR UPDATE`,
      [eventId]
    );
    if (!eventRows.length) {
      throw new Error('Event not found');
    }
    const event = eventRows[0];
    const now = new Date();
    if (now > event.registration_deadline) {
      throw new Error('Registration deadline has passed');
    }

    // Duplicate registration check
    const [dupRows] = await conn.execute(
      `SELECT id FROM registrations WHERE event_id = ? AND student_id = ?`,
      [eventId, studentId]
    );
    if (dupRows.length) {
      throw new Error('Student already registered for this event');
    }

    // Available slots check – placeholder: assume max 200 slots per event
    const [countRows] = await conn.execute(
      `SELECT COUNT(*) as cnt FROM registrations WHERE event_id = ?`,
      [eventId]
    );
    const currentCount = countRows[0].cnt;
    const MAX_SLOTS = 200; // TODO: replace with real event capacity field
    if (currentCount >= MAX_SLOTS) {
      throw new Error('No available slots for this event');
    }

    // Insert registration
    await conn.execute(
      `INSERT INTO registrations (event_id, student_id, status) VALUES (?, ?, 'confirmed')`,
      [eventId, studentId]
    );

    await conn.commit();
    return { success: true, type: 'individual' };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

/**
 * Register a team for an event.
 * Validations: deadline, captain ownership, team size, duplicate registration, slots.
 */
export async function registerTeam(eventId, teamId, captainId) {
  const conn = await getConnection();
  try {
    await conn.beginTransaction();

    // Verify captain ownership
    const captain = await isCaptain(teamId, captainId);
    if (!captain) {
      throw new Error('Only the team captain can register the team');
    }

    // Fetch event details, including max_team_size
    const [eventRows] = await conn.execute(
      `SELECT registration_deadline, max_team_size FROM events WHERE id = ? FOR UPDATE`,
      [eventId]
    );
    if (!eventRows.length) {
      throw new Error('Event not found');
    }
    const event = eventRows[0];
    const now = new Date();
    if (now > event.registration_deadline) {
      throw new Error('Registration deadline has passed');
    }

    // Verify team size against event.max_team_size (if defined)
    if (event.max_team_size) {
      const [memberRows] = await conn.execute(
        `SELECT COUNT(*) as cnt FROM team_members WHERE team_id = ?`,
        [teamId]
      );
      const teamSize = memberRows[0].cnt;
      if (teamSize > event.max_team_size) {
        throw new Error('Team size exceeds the allowed maximum for this event');
      }
    }

    // Duplicate registration check for the team
    const [dupRows] = await conn.execute(
      `SELECT id FROM registrations WHERE event_id = ? AND team_id = ?`,
      [eventId, teamId]
    );
    if (dupRows.length) {
      throw new Error('Team already registered for this event');
    }

    // Available slots check – placeholder same as individual
    const [countRows] = await conn.execute(
      `SELECT COUNT(*) as cnt FROM registrations WHERE event_id = ?`,
      [eventId]
    );
    const currentCount = countRows[0].cnt;
    const MAX_SLOTS = 200; // TODO: replace with real capacity
    if (currentCount >= MAX_SLOTS) {
      throw new Error('No available slots for this event');
    }

    // Insert registration with team reference
    await conn.execute(
      `INSERT INTO registrations (event_id, team_id, status) VALUES (?, ?, 'confirmed')`,
      [eventId, teamId]
    );

    await conn.commit();
    return { success: true, type: 'team' };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
