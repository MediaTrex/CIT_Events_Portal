// backend/routes/dashboardRoutes.js
// Router for Dashboard Analytics APIs

import express from 'express';
import {
  getStudentDashboardHandler,
  getOrganizerDashboardHandler,
  getAdminDashboardHandler,
} from '../controllers/dashboardController.js';

const router = express.Router();

// Student dashboard (requires studentId)
router.get('/student/:studentId', getStudentDashboardHandler);

// Organizer dashboard (requires organizerId)
router.get('/organizer/:organizerId', getOrganizerDashboardHandler);

// Admin dashboard (no params)
router.get('/admin', getAdminDashboardHandler);

export default router;
