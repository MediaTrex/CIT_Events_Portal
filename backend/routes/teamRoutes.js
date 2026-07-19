// backend/routes/teamRoutes.js
// Routes for Team Management (MVC)

import express from 'express';
import { authenticate, authorize } from '../middleware/rbac.js';
import {
  postCreateTeam,
  getTeamDetails,
  putUpdateTeam,
  deleteTeamRoute,
  postAddMember,
  deleteMember
} from '../controllers/teamController.js';
import { postSendInvite, putRespondInvite } from '../controllers/teamInviteController.js';

const router = express.Router();

// Create a team – any authenticated student (captain) can create
router.post('/', authenticate, authorize('student', 'organizer', 'admin'), postCreateTeam);

// View team details – any authenticated user
router.get('/:id', authenticate, getTeamDetails);

// Update team – only captain (checked in service)
router.put('/:id', authenticate, authorize('student', 'organizer', 'admin'), putUpdateTeam);

// Delete team – only captain (checked in service)
router.delete('/:id', authenticate, authorize('student', 'organizer', 'admin'), deleteTeamRoute);

// Add member – only captain (checked in service)
router.post('/:id/members', authenticate, authorize('student', 'organizer', 'admin'), postAddMember);

// Remove member – only captain (checked in service)
router.delete('/:id/members/:studentId', authenticate, authorize('student', 'organizer', 'admin'), deleteMember);

// ----- Invitation routes -----
// Send invitation from team captain
router.post('/:id/invite', authenticate, authorize('student', 'organizer', 'admin'), postSendInvite);

// Respond to an invitation (accept/reject)
router.put('/invites/:inviteId/response', authenticate, putRespondInvite);

export default router;
