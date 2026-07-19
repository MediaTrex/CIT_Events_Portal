// backend/controllers/teamController.js
// Controller layer for Team Management (MVC)

import {
  createTeam,
  getTeam,
  updateTeam,
  deleteTeam,
  addMember,
  removeMember
} from '../services/teamService.js';

/** Create a new team */
export const postCreateTeam = async (req, res) => {
  try {
    const organizerId = req.user.id; // assuming student acting as captain
    const { eventId, name } = req.body;
    if (!eventId || !name) {
      return res.status(400).json({ error: 'eventId and name are required' });
    }
    const result = await createTeam({ eventId, name, captainId: organizerId });
    res.status(201).json({ message: 'Team created', team: result });
  } catch (err) {
    console.error('Create team error:', err);
    res.status(400).json({ error: err.message });
  }
};

/** Get team details */
export const getTeamDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await getTeam(id);
    res.json(team);
  } catch (err) {
    console.error('Get team error:', err);
    res.status(404).json({ error: err.message });
  }
};

/** Update team (currently only name) */
export const putUpdateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const result = await updateTeam(id, updates, req.user.id);
    res.json({ message: 'Team updated', result });
  } catch (err) {
    console.error('Update team error:', err);
    res.status(400).json({ error: err.message });
  }
};

/** Delete team */
export const deleteTeamRoute = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTeam(id, req.user.id);
    res.json({ message: 'Team deleted' });
  } catch (err) {
    console.error('Delete team error:', err);
    res.status(400).json({ error: err.message });
  }
};

/** Add member to team */
export const postAddMember = async (req, res) => {
  try {
    const { id } = req.params; // teamId
    const { studentId } = req.body;
    if (!studentId) {
      return res.status(400).json({ error: 'studentId is required' });
    }
    const result = await addMember(id, studentId, req.user.id);
    res.json({ message: 'Member added', result });
  } catch (err) {
    console.error('Add member error:', err);
    res.status(400).json({ error: err.message });
  }
};

/** Remove member from team */
export const deleteMember = async (req, res) => {
  try {
    const { id, studentId } = req.params; // teamId, studentId
    const result = await removeMember(id, studentId, req.user.id);
    res.json({ message: 'Member removed', result });
  } catch (err) {
    console.error('Remove member error:', err);
    res.status(400).json({ error: err.message });
  }
};
