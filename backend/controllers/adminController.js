// backend/controllers/adminController.js
// Handles HTTP requests for admin-only endpoints, including organizer approvals

import { getOrganizers, approveOrganizer, rejectOrganizer } from '../services/adminService.js';
import { getAllUsers, suspendUser, activateUser, deleteUser } from '../services/userService.js';

/** List all organizers */
export const listOrganizers = async (req, res) => {
  try {
    const organizers = await getOrganizers();
    res.json(organizers);
  } catch (err) {
    console.error('List organizers error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** Approve organizer */
export const patchApproveOrganizer = async (req, res) => {
  try {
    const { id } = req.params;
    await approveOrganizer(id);
    res.json({ message: 'Organizer account approved successfully' });
  } catch (err) {
    console.error('Approve organizer error:', err);
    res.status(400).json({ error: err.message });
  }
};

/** Reject organizer */
export const patchRejectOrganizer = async (req, res) => {
  try {
    const { id } = req.params;
    await rejectOrganizer(id);
    res.json({ message: 'Organizer account rejected successfully' });
  } catch (err) {
    console.error('Reject organizer error:', err);
    res.status(400).json({ error: err.message });
  }
};

/** List all users (admin user management) */
export const listUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error('List users error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** Suspend user account */
export const patchSuspendUser = async (req, res) => {
  try {
    const { id } = req.params;
    await suspendUser(id);
    res.json({ message: 'User suspended successfully' });
  } catch (err) {
    console.error('Suspend user error:', err);
    res.status(400).json({ error: err.message });
  }
};

/** Activate user account */
export const patchActivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    await activateUser(id);
    res.json({ message: 'User activated successfully' });
  } catch (err) {
    console.error('Activate user error:', err);
    res.status(400).json({ error: err.message });
  }
};

/** Delete user account */
export const deleteUserAccount = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(400).json({ error: err.message });
  }
};
