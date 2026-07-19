// backend/controllers/userController.js

import {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfilePicture,
  getAllUsers,
  suspendUser,
  activateUser,
  deleteUser,
} from '../services/userService.js';

/*** Regular user endpoints ***/
export const getMyProfile = async (req, res) => {
  try {
    const profile = await getProfile(req.user.id);
    res.json(profile);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: err.message });
  }
};

export const patchMyProfile = async (req, res) => {
  try {
    const updated = await updateProfile(req.user.id, req.body);
    res.json(updated);
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(400).json({ error: err.message });
  }
};

export const patchChangePassword = async (req, res) => {
  try {
    await changePassword(req.user.id, req.body);
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(400).json({ error: err.message });
  }
};

export const postUploadPicture = async (req, res) => {
  try {
    const url = await uploadProfilePicture(req.user.id, req.file);
    res.json({ profilePicUrl: url });
  } catch (err) {
    console.error('Upload picture error:', err);
    res.status(500).json({ error: err.message });
  }
};

/*** Admin endpoints ***/
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error('Get all users error:', err);
    res.status(500).json({ error: err.message });
  }
};

export const patchSuspendUser = async (req, res) => {
  try {
    await suspendUser(req.params.id);
    res.json({ message: 'User suspended' });
  } catch (err) {
    console.error('Suspend user error:', err);
    res.status(400).json({ error: err.message });
  }
};

export const patchActivateUser = async (req, res) => {
  try {
    await activateUser(req.params.id);
    res.json({ message: 'User activated' });
  } catch (err) {
    console.error('Activate user error:', err);
    res.status(400).json({ error: err.message });
  }
};

export const deleteUserAccount = async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(400).json({ error: err.message });
  }
};
