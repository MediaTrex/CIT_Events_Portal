// backend/routes/eventRoutes.js
// Routes for event retrieval, search, filter, and management

import express from 'express';
import { authenticate, authorize } from '../middleware/rbac.js';
import {
  postCreateEvent,
  putUpdateEvent,
  patchPublishEvent,
  deleteEventRoute,
  getEventDetails,
  getEventsList,
  getAdminEventsList,
  postUploadEventImage
} from '../controllers/eventController.js';
import { imageUpload } from '../middleware/imageUpload.js';

const router = express.Router();

// Public endpoints (view events, search, filter)
router.get('/', getEventsList);
router.get('/:id', getEventDetails);

// Management endpoints (Organizer & Admin authorized)
router.post('/', authenticate, authorize('organizer', 'admin'), postCreateEvent);
router.put('/:id', authenticate, authorize('organizer', 'admin'), putUpdateEvent);
router.patch('/:id/publish', authenticate, authorize('organizer', 'admin'), patchPublishEvent);
router.delete('/:id', authenticate, authorize('organizer', 'admin'), deleteEventRoute);
router.post('/:id/images', authenticate, authorize('organizer', 'admin'), imageUpload.single('image'), postUploadEventImage);

// Admin exclusive endpoint (view all including draft)
router.get('/admin/all', authenticate, authorize('admin'), getAdminEventsList);

export default router;
