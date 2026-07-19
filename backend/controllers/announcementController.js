// backend/controllers/announcementController.js
// Controller layer for Announcement System (Admin/Organizer CRUD)

import {
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  listAnnouncements,
} from '../services/announcementService.js';

/** Create announcement (admin or organizer) */
export const createAnnouncementHandler = async (req, res) => {
  try {
    const creatorId = req.user.id; // assume auth middleware adds user
    const { title, body } = req.body;
    const announcement = await createAnnouncement({ creatorId, title, body });
    res.status(201).json({ announcement });
  } catch (err) {
    console.error('Create announcement error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** Update announcement */
export const updateAnnouncementHandler = async (req, res) => {
  try {
    const { announcementId } = req.params;
    const { title, body } = req.body;
    const affected = await updateAnnouncement(Number(announcementId), { title, body });
    res.json({ affectedRows: affected });
  } catch (err) {
    console.error('Update announcement error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** Delete announcement */
export const deleteAnnouncementHandler = async (req, res) => {
  try {
    const { announcementId } = req.params;
    const affected = await deleteAnnouncement(Number(announcementId));
    res.json({ affectedRows: affected });
  } catch (err) {
    console.error('Delete announcement error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** List announcements (public) */
export const listAnnouncementsHandler = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 20;
    const offset = Number(req.query.offset) || 0;
    const announcements = await listAnnouncements(limit, offset);
    res.json({ announcements });
  } catch (err) {
    console.error('List announcements error:', err);
    res.status(500).json({ error: err.message });
  }
};
