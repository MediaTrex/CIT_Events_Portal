// backend/controllers/eventResultController.js
// Controller layer for Event Results (organizer CRUD, participant view)

import {
  publishResults,
  updateResult,
  deleteResult,
  getResults,
  getRankings,
} from '../services/eventResultService.js';

/** Publish results (bulk) */
export const publishResultsHandler = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { results } = req.body; // array of { participantId?, teamId?, rank, score? }
    await publishResults(Number(eventId), results);
    res.status(201).json({ message: 'Results published' });
  } catch (err) {
    console.error('Publish results error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** Update a single result */
export const updateResultHandler = async (req, res) => {
  try {
    const { resultId } = req.params;
    const data = req.body; // { participantId, teamId, rank, score }
    const result = await updateResult(Number(resultId), data);
    res.json({ affectedRows: result.affectedRows });
  } catch (err) {
    console.error('Update result error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** Delete a result */
export const deleteResultHandler = async (req, res) => {
  try {
    const { resultId } = req.params;
    const result = await deleteResult(Number(resultId));
    res.json({ affectedRows: result.affectedRows });
  } catch (err) {
    console.error('Delete result error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** Participant view: get results for an event */
export const getResultsHandler = async (req, res) => {
  try {
    const { eventId } = req.params;
    const rows = await getResults(Number(eventId));
    res.json({ results: rows });
  } catch (err) {
    console.error('Get results error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** Get rankings (simplified view) */
export const getRankingsHandler = async (req, res) => {
  try {
    const { eventId } = req.params;
    const rows = await getRankings(Number(eventId));
    res.json({ rankings: rows });
  } catch (err) {
    console.error('Get rankings error:', err);
    res.status(500).json({ error: err.message });
  }
};
