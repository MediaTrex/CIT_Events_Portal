// backend/routes/notificationRoutes.js
// Routes for Notification Management (MVC)

import express from 'express';
import { authenticate } from '../middleware/rbac.js';
import {
  postCreateNotification,
  putMarkRead,
  getUserNotificationsHandler,
  getUnreadCountHandler
} from '../controllers/notificationController.js';

const router = express.Router();

// Create a notification (admin / system) – protected, but allow any authenticated user for demo
router.post('/', authenticate, postCreateNotification);

// Mark as read
router.put('/:id/read', authenticate, putMarkRead);

// Get paginated notifications for current user
router.get('/', authenticate, getUserNotificationsHandler);

// Get unread count for current user
router.get('/unread/count', authenticate, getUnreadCountHandler);

export default router;
