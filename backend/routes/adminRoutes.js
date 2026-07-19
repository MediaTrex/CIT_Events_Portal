// backend/routes/adminRoutes.js
// Admin-only routing, including organizer approval workflow and user management

import express from 'express';
import { authenticate, authorize } from '../middleware/rbac.js';
import {
  listOrganizers,
  patchApproveOrganizer,
  patchRejectOrganizer,
  listUsers,
  patchSuspendUser,
  patchActivateUser,
  deleteUserAccount
} from '../controllers/adminController.js';

const router = express.Router();

// Authenticate and authorize admin for all routes in this file
router.use(authenticate, authorize('admin'));

// Organizer approval workflow
router.get('/organizers', listOrganizers);
router.patch('/organizers/:id/approve', patchApproveOrganizer);
router.patch('/organizers/:id/reject', patchRejectOrganizer);

// User management
router.get('/users', listUsers);
router.patch('/users/:id/suspend', patchSuspendUser);
router.patch('/users/:id/activate', patchActivateUser);
router.delete('/users/:id', deleteUserAccount);

export default router;
