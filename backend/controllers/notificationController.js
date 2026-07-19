// backend/controllers/notificationController.js
// Controller layer for Notification Management (MVC)

import {
  createNotification,
  markAsRead,
  getUserNotifications,
  getUnreadCount
} from '../services/notificationService.js';

/** Create a notification (admin / system use) */
export const postCreateNotification = async (req, res) => {
  try {
    const { userId, type, title, body, url } = req.body;
    if (!userId || !type || !title) {
      return res.status(400).json({ error: 'userId, type and title are required' });
    }
    const notification = await createNotification({ userId, type, title, body, url });
    res.status(201).json({ message: 'Notification created', notification });
  } catch (err) {
    console.error('Create notification error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** Mark a notification as read */
export const putMarkRead = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await markAsRead(Number(id));
    res.json({ message: 'Notification marked as read', notification: updated });
  } catch (err) {
    console.error('Mark read error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** Get paginated notifications for the authenticated user */
export const getUserNotificationsHandler = async (req, res) => {
  try {
    const userId = req.user.id; // assuming auth middleware sets req.user
    const limit = Number(req.query.limit) || 20;
    const offset = Number(req.query.offset) || 0;
    const notifications = await getUserNotifications(userId, limit, offset);
    res.json({ notifications, limit, offset });
  } catch (err) {
    console.error('Get notifications error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** Get unread count for the authenticated user */
export const getUnreadCountHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const unread = await getUnreadCount(userId);
    res.json({ unread });
  } catch (err) {
    console.error('Unread count error:', err);
    res.status(500).json({ error: err.message });
  }
};
