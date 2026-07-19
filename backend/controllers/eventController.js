// backend/controllers/eventController.js
// Handles incoming HTTP requests for event management

import {
  createEvent,
  updateEvent,
  publishEvent,
  deleteEvent,
  getEventById,
  getEvents,
  getAdminEvents,
  addEventImage
} from '../services/eventService.js';
import { uploadToCloudinary } from '../services/cloudinaryService.js';

/** Create event */
export const postCreateEvent = async (req, res) => {
  try {
    // Organizer ID comes from token payload req.user.id
    const organizerId = req.user.id;
    const result = await createEvent(organizerId, req.body);
    res.status(201).json({ message: 'Event created as draft successfully', eventId: result.id, slug: result.slug });
  } catch (err) {
    console.error('Create event error:', err);
    res.status(400).json({ error: err.message });
  }
};

/** Update event */
export const putUpdateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const organizerId = req.user.id;
    const isAdmin = req.user.role === 'admin';
    await updateEvent(id, organizerId, req.body, isAdmin);
    res.json({ message: 'Event updated successfully' });
  } catch (err) {
    console.error('Update event error:', err);
    res.status(400).json({ error: err.message });
  }
};

/** Publish event */
export const patchPublishEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const organizerId = req.user.id;
    const isAdmin = req.user.role === 'admin';
    await publishEvent(id, organizerId, isAdmin);
    res.json({ message: 'Event published successfully' });
  } catch (err) {
    console.error('Publish event error:', err);
    res.status(400).json({ error: err.message });
  }
};

/** Delete event */
export const deleteEventRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const organizerId = req.user.id;
    const isAdmin = req.user.role === 'admin';
    await deleteEvent(id, organizerId, isAdmin);
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Delete event error:', err);
    res.status(400).json({ error: err.message });
  }
};

/** Get event details */
export const getEventDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await getEventById(id);
    res.json(event);
  } catch (err) {
    console.error('Get event details error:', err);
    res.status(404).json({ error: err.message });
  }
};

/** List events for public/participants (search, filter, pagination, sorting) */
export const getEventsList = async (req, res) => {
  try {
    const {
      search,
      categoryId,
      isOnline,
      isPaid,
      page = 1,
      limit = 10,
      sortBy = 'start_date',
      order = 'ASC'
    } = req.query;

    const filters = {
      search,
      categoryId: categoryId ? Number(categoryId) : null,
      isOnline: isOnline === 'true' ? true : isOnline === 'false' ? false : null,
      isPaid: isPaid === 'true' ? true : isPaid === 'false' ? false : null,
      page: Number(page),
      limit: Number(limit),
      sortBy,
      order
    };

    const results = await getEvents(filters);
    res.json(results);
  } catch (err) {
    console.error('List events error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** List all events for admin dashboard */
export const getAdminEventsList = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'created_at',
      order = 'DESC'
    } = req.query;

    const options = {
      page: Number(page),
      limit: Number(limit),
      sortBy,
      order
    };

    const results = await getAdminEvents(options);
    res.json(results);
  } catch (err) {
    console.error('Admin list events error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** Upload event image and store URL in DB */
export const postUploadEventImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { isCover } = req.body;
    const organizerId = req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    // Upload local file to Cloudinary and get URL (automatic local file deletion)
    const imageUrl = await uploadToCloudinary(req.file.path, 'event-images');

    // Save image URL to DB
    await addEventImage(id, organizerId, imageUrl, isCover === 'true', isAdmin);

    res.json({ message: 'Event image uploaded successfully', imageUrl });
  } catch (err) {
    console.error('Upload event image error:', err);
    res.status(400).json({ error: err.message });
  }
};
