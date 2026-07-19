// backend/controllers/teamInviteController.js
// Controller layer for Team Invitation Management (MVC)

import { sendInvite, respondToInvite } from '../services/teamInviteService.js';

/** Send an invitation from team captain to another student */
export const postSendInvite = async (req, res) => {
  try {
    const { teamId } = req.params;
    const senderId = req.user.id; // authenticated user (captain)
    const { receiverId } = req.body;
    if (!receiverId) {
      return res.status(400).json({ error: 'receiverId is required' });
    }
    const invitation = await sendInvite(Number(teamId), Number(senderId), Number(receiverId));
    // TODO: create a notification entry for receiver if needed
    res.status(201).json({ message: 'Invitation sent', invitation });
  } catch (err) {
    console.error('Send invite error:', err);
    res.status(400).json({ error: err.message });
  }
};

/** Respond to an invitation (accept or reject) */
export const putRespondInvite = async (req, res) => {
  try {
    const { inviteId } = req.params;
    const responderId = req.user.id; // authenticated user (receiver)
    const { response } = req.body; // expected 'accepted' or 'rejected'
    if (!response) {
      return res.status(400).json({ error: 'response is required' });
    }
    const result = await respondToInvite(Number(inviteId), Number(responderId), response);
    res.json({ message: 'Invitation response recorded', result });
  } catch (err) {
    console.error('Respond invite error:', err);
    res.status(400).json({ error: err.message });
  }
};
