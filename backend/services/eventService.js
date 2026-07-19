// backend/services/eventService.js
// Business logic for event creation, listing, updating, deleting, search, and filtering

import { getConnection } from '../config/database.js';

// Helper to generate a URL-friendly unique slug from title
function generateSlug(title) {
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-')         // Replace spaces with dash
    .replace(/-+/g, '-')          // Collapse multiple dashes
    .trim();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `${cleanTitle}-${randomSuffix}`;
}

/** Create new event */
export async function createEvent(organizerId, eventData) {
  const {
    title,
    description,
    categoryId,
    venue,
    isOnline = false,
    startDate,
    endDate,
    registrationDeadline,
    maxTeamSize = 1,
    minTeamSize = 1,
    isPaid = false,
    priceCents = 0,
    prizePool,
    images = [] // Array of image URLs
  } = eventData;

  const slug = generateSlug(title);
  const conn = await getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.execute(`
      INSERT INTO events (
        title, slug, description, category_id, organizer_id, venue, is_online,
        start_date, end_date, registration_deadline, max_team_size, min_team_size,
        is_paid, price_cents, prize_pool, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft', NOW(), NOW())
    `, [
      title, slug, description, categoryId || null, organizerId, venue || null, isOnline ? 1 : 0,
      new Date(startDate), new Date(endDate), new Date(registrationDeadline), maxTeamSize, minTeamSize,
      isPaid ? 1 : 0, priceCents, prizePool || null
    ]);

    const eventId = result.insertId;

    // Handle event images
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await conn.execute(
          'INSERT INTO event_images (event_id, image_url, is_cover) VALUES (?, ?, ?)',
          [eventId, images[i], i === 0 ? 1 : 0]
        );
      }
    }

    await conn.commit();
    return { id: eventId, slug };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

/** Update an event */
export async function updateEvent(eventId, organizerId, updates, isAdmin = false) {
  const conn = await getConnection();
  try {
    // Check if event exists and check ownership if not admin
    const [existing] = await conn.execute('SELECT organizer_id FROM events WHERE id = ?', [eventId]);
    if (!existing.length) throw new Error('Event not found');
    if (!isAdmin && existing[0].organizer_id !== organizerId) {
      throw new Error('Access denied: You are not the organizer of this event');
    }

    const allowedFields = [
      'title', 'description', 'category_id', 'venue', 'is_online',
      'start_date', 'end_date', 'registration_deadline', 'max_team_size',
      'min_team_size', 'is_paid', 'price_cents', 'prize_pool', 'status'
    ];

    const fieldsToUpdate = [];
    const values = [];

    for (const key of Object.keys(updates)) {
      if (allowedFields.includes(key)) {
        fieldsToUpdate.push(`${key} = ?`);
        let val = updates[key];
        if (['start_date', 'end_date', 'registration_deadline'].includes(key)) {
          val = new Date(val);
        } else if (['is_online', 'is_paid'].includes(key)) {
          val = val ? 1 : 0;
        }
        values.push(val);
      }
    }

    if (updates.title) {
      fieldsToUpdate.push('slug = ?');
      values.push(generateSlug(updates.title));
    }

    if (fieldsToUpdate.length === 0) throw new Error('No valid fields to update');

    values.push(eventId);

    await conn.execute(`
      UPDATE events 
      SET ${fieldsToUpdate.join(', ')}, updated_at = NOW() 
      WHERE id = ?
    `, values);

    return { id: eventId };
  } finally {
    conn.release();
  }
}

/** Publish an event */
export async function publishEvent(eventId, organizerId, isAdmin = false) {
  const conn = await getConnection();
  try {
    const [existing] = await conn.execute('SELECT organizer_id FROM events WHERE id = ?', [eventId]);
    if (!existing.length) throw new Error('Event not found');
    if (!isAdmin && existing[0].organizer_id !== organizerId) {
      throw new Error('Access denied: You are not the organizer of this event');
    }

    await conn.execute(
      "UPDATE events SET status = 'published', updated_at = NOW() WHERE id = ?",
      [eventId]
    );
    return { id: eventId, status: 'published' };
  } finally {
    conn.release();
  }
}

/** Delete an event */
export async function deleteEvent(eventId, organizerId, isAdmin = false) {
  const conn = await getConnection();
  try {
    const [existing] = await conn.execute('SELECT organizer_id FROM events WHERE id = ?', [eventId]);
    if (!existing.length) throw new Error('Event not found');
    if (!isAdmin && existing[0].organizer_id !== organizerId) {
      throw new Error('Access denied: You are not the organizer of this event');
    }

    await conn.execute('DELETE FROM events WHERE id = ?', [eventId]);
    return { id: eventId };
  } finally {
    conn.release();
  }
}

/** Get a single event details */
export async function getEventById(eventId) {
  const conn = await getConnection();
  try {
    const [events] = await conn.execute(`
      SELECT 
        e.*,
        c.name as categoryName,
        o.first_name as organizerFirstName,
        o.last_name as organizerLastName,
        o.profile_pic_url as organizerProfilePic
      FROM events e
      LEFT JOIN event_categories c ON e.category_id = c.id
      LEFT JOIN organizers o ON e.organizer_id = o.user_id
      WHERE e.id = ?
    `, [eventId]);

    if (!events.length) throw new Error('Event not found');
    const event = events[0];

    // Get event images
    const [images] = await conn.execute(
      'SELECT id, image_url as imageUrl, is_cover as isCover FROM event_images WHERE event_id = ?',
      [eventId]
    );
    event.images = images;

    return event;
  } finally {
    conn.release();
  }
}

/** Query events for participants (Public search/filter/pagination/sorting) */
export async function getEvents(filters = {}) {
  const {
    search = '',
    categoryId = null,
    isOnline = null,
    isPaid = null,
    page = 1,
    limit = 10,
    sortBy = 'start_date',
    order = 'ASC',
    status = 'published' // Default to only published events for public
  } = filters;

  const conn = await getConnection();
  try {
    const offset = (page - 1) * limit;
    const whereClauses = [];
    const queryParams = [];

    // Enforce status filter
    whereClauses.push('e.status = ?');
    queryParams.push(status);

    if (search) {
      whereClauses.push('(e.title LIKE ? OR e.description LIKE ?)');
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    if (categoryId) {
      whereClauses.push('e.category_id = ?');
      queryParams.push(categoryId);
    }

    if (isOnline !== null) {
      whereClauses.push('e.is_online = ?');
      queryParams.push(isOnline ? 1 : 0);
    }

    if (isPaid !== null) {
      whereClauses.push('e.is_paid = ?');
      queryParams.push(isPaid ? 1 : 0);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // Validate sorting parameters to prevent SQL injection
    const allowedSortFields = ['title', 'start_date', 'end_date', 'created_at', 'price_cents'];
    const finalSortBy = allowedSortFields.includes(sortBy) ? `e.${sortBy}` : 'e.start_date';
    const finalOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    // Count total matched records
    const [countRows] = await conn.execute(
      `SELECT COUNT(*) as count FROM events e ${whereSql}`,
      queryParams
    );
    const totalCount = countRows[0].count;

    // Fetch paginated results
    const selectSql = `
      SELECT 
        e.*,
        c.name as categoryName,
        o.first_name as organizerFirstName,
        o.last_name as organizerLastName,
        (SELECT image_url FROM event_images WHERE event_id = e.id AND is_cover = 1 LIMIT 1) as coverImage
      FROM events e
      LEFT JOIN event_categories c ON e.category_id = c.id
      LEFT JOIN organizers o ON e.organizer_id = o.user_id
      ${whereSql}
      ORDER BY ${finalSortBy} ${finalOrder}
      LIMIT ? OFFSET ?
    `;

    queryParams.push(Number(limit), Number(offset));
    const [rows] = await conn.execute(selectSql, queryParams);

    return {
      events: rows,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: Number(page),
        limit: Number(limit)
      }
    };
  } finally {
    conn.release();
  }
}

/** Get all events for admin (any status, with pagination/sorting) */
export async function getAdminEvents(options = {}) {
  const {
    page = 1,
    limit = 10,
    sortBy = 'created_at',
    order = 'DESC'
  } = options;

  const conn = await getConnection();
  try {
    const offset = (page - 1) * limit;

    const [countRows] = await conn.execute('SELECT COUNT(*) as count FROM events');
    const totalCount = countRows[0].count;

    const allowedSortFields = ['title', 'start_date', 'end_date', 'created_at', 'price_cents', 'status'];
    const finalSortBy = allowedSortFields.includes(sortBy) ? `e.${sortBy}` : 'e.created_at';
    const finalOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const [rows] = await conn.execute(`
      SELECT 
        e.*,
        c.name as categoryName,
        o.first_name as organizerFirstName,
        o.last_name as organizerLastName
      FROM events e
      LEFT JOIN event_categories c ON e.category_id = c.id
      LEFT JOIN organizers o ON e.organizer_id = o.user_id
      ORDER BY ${finalSortBy} ${finalOrder}
      LIMIT ? OFFSET ?
    `, [Number(limit), Number(offset)]);

    return {
      events: rows,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: Number(page),
        limit: Number(limit)
      }
    };
  } finally {
    conn.release();
  }
}

/** Add an image to an event */
export async function addEventImage(eventId, organizerId, imageUrl, isCover = false, isAdmin = false) {
  const conn = await getConnection();
  try {
    // Check if event exists and check ownership if not admin
    const [existing] = await conn.execute('SELECT organizer_id FROM events WHERE id = ?', [eventId]);
    if (!existing.length) throw new Error('Event not found');
    if (!isAdmin && existing[0].organizer_id !== organizerId) {
      throw new Error('Access denied: You are not the organizer of this event');
    }

    // Insert image details into database
    await conn.execute(
      'INSERT INTO event_images (event_id, image_url, is_cover) VALUES (?, ?, ?)',
      [eventId, imageUrl, isCover ? 1 : 0]
    );
    return { imageUrl };
  } finally {
    conn.release();
  }
}

