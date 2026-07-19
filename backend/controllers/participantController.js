// backend/controllers/participantController.js
// Controller layer for Participant Management (Organizer APIs)

import {
  getParticipants,
  exportParticipantsCSV,
  getPaymentStatus,
  getTeams,
  getRegistrations,
} from '../services/participantService.js';

/** Get participants list with pagination and optional search */
export const getParticipantsHandler = async (req, res) => {
  try {
    const { eventId } = req.params;
    const limit = Number(req.query.limit) || 20;
    const offset = Number(req.query.offset) || 0;
    const search = req.query.search || '';
    const participants = await getParticipants(Number(eventId), { limit, offset, search });
    res.json({ participants, limit, offset, search });
  } catch (err) {
    console.error('Get participants error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** Export participants as CSV */
export const exportParticipantsCSVHandler = async (req, res) => {
  try {
    const { eventId } = req.params;
    const csv = await exportParticipantsCSV(Number(eventId));
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="event_${eventId}_participants.csv"`);
    res.send(csv);
  } catch (err) {
    console.error('Export participants CSV error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** Get payment status for a registration */
export const getPaymentStatusHandler = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const status = await getPaymentStatus(Number(registrationId));
    if (!status) return res.status(404).json({ error: 'Payment not found' });
    res.json(status);
  } catch (err) {
    console.error('Get payment status error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** Get teams for an event */
export const getTeamsHandler = async (req, res) => {
  try {
    const { eventId } = req.params;
    const teams = await getTeams(Number(eventId));
    res.json({ teams });
  } catch (err) {
    console.error('Get teams error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** Get registrations for an event */
export const getRegistrationsHandler = async (req, res) => {
  try {
    const { eventId } = req.params;
    const registrations = await getRegistrations(Number(eventId));
    res.json({ registrations });
  } catch (err) {
    console.error('Get registrations error:', err);
    res.status(500).json({ error: err.message });
  }
};
