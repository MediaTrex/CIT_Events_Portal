// backend/routes/userRoutes.js
// Routes for user profile retrieval, update, change password, and profile picture upload

import express from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/rbac.js';
import { getMyProfile, patchMyProfile, patchChangePassword, postUploadPicture } from '../controllers/userController.js';

const router = express.Router();

// Multer upload config - using root-level temporary uploads folder
const upload = multer({ dest: 'uploads/tmp/' });

// Authenticate user for all routes in this file
router.use(authenticate);

router.get('/profile', getMyProfile);
router.patch('/profile', patchMyProfile);
router.patch('/change-password', patchChangePassword);
router.post('/upload-avatar', upload.single('avatar'), postUploadPicture);

export default router;
