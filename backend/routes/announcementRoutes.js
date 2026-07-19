// backend/routes/announcementRoutes.js
// Routes for Announcement System (Admin/Organizer CRUD)

import express from 'express';
import { authenticate, authorize } from '../middleware/rbac.js';
import {
  createAnnouncementHandler,
  updateAnnouncementHandler,
  deleteAnnouncementHandler,
  listAnnouncementsHandler,
} from '../controllers/announcementController.js';

const router = express.Router();

// List announcements (public, no auth required)
router.get('/', listAnnouncementsHandler);

// Create announcement (admin or organizer)
router.post('/', authenticate, authorize('admin', 'organizer'), createAnnouncementHandler);

// Update announcement
router.put('/:announcementId', authenticate, authorize('admin', 'organizer'), updateAnnouncementHandler);

// Delete announcement
router.delete('/:announcementId', authenticate, authorize('admin', 'organizer'), deleteAnnouncementHandler);

export default router;
