// backend/controllers/dashboardController.js
// Controller layer for dashboard analytics (student, organizer, admin)

import {
  getStudentDashboard,
  getOrganizerDashboard,
  getAdminDashboard,
} from '../services/dashboardService.js';

/** GET /api/dashboard/student/:studentId */
export const getStudentDashboardHandler = async (req, res) => {
  try {
    const { studentId } = req.params;
    const data = await getStudentDashboard(Number(studentId));
    res.json(data);
  } catch (err) {
    console.error('Student dashboard error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** GET /api/dashboard/organizer/:organizerId */
export const getOrganizerDashboardHandler = async (req, res) => {
  try {
    const { organizerId } = req.params;
    const data = await getOrganizerDashboard(Number(organizerId));
    res.json(data);
  } catch (err) {
    console.error('Organizer dashboard error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** GET /api/dashboard/admin */
export const getAdminDashboardHandler = async (req, res) => {
  try {
    const data = await getAdminDashboard();
    res.json(data);
  } catch (err) {
    console.error('Admin dashboard error:', err);
    res.status(500).json({ error: err.message });
  }
};
