// backend/routes/participantRoutes.js
// Router for Organizer Participant Management APIs

import express from 'express';
import {
  getParticipantsHandler,
  exportParticipantsCSVHandler,
  getPaymentStatusHandler,
  getTeamsHandler,
  getRegistrationsHandler,
} from '../controllers/participantController.js';

const router = express.Router();

// Participants list with pagination & search
router.get('/events/:eventId/participants', getParticipantsHandler);

// Export participants CSV for an event
router.get('/events/:eventId/participants/export', exportParticipantsCSVHandler);

// Payment status for a specific registration
router.get('/payments/:registrationId/status', getPaymentStatusHandler);

// Teams for an event
router.get('/events/:eventId/teams', getTeamsHandler);

// Registrations for an event
router.get('/events/:eventId/registrations', getRegistrationsHandler);

export default router;
