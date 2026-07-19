// backend/services/userService.js
// Business logic for user management (profile, password, avatar, admin ops)

import bcrypt from 'bcrypt';
import { getConnection } from '../config/database.js';
import path from 'path';
import fs from 'fs/promises';

const SALT_ROUNDS = 12;

// ----------- Regular user services -----------
export async function getProfile(userId) {
  const conn = await getConnection();
  try {
    const [userRows] = await conn.execute(
      'SELECT id, email, role, status, created_at, updated_at FROM users WHERE id = ?',
      [userId]
    );
    if (!userRows.length) throw new Error('User not found');
    const user = userRows[0];

    let profileData = {};
    if (user.role === 'student') {
      const [profileRows] = await conn.execute(
        'SELECT first_name, last_name, department, profile_pic_url FROM students WHERE user_id = ?',
        [userId]
      );
      if (profileRows.length) profileData = profileRows[0];
    } else if (user.role === 'organizer') {
      const [profileRows] = await conn.execute(
        'SELECT first_name, last_name, department, profile_pic_url FROM organizers WHERE user_id = ?',
        [userId]
      );
      if (profileRows.length) profileData = profileRows[0];
    } else if (user.role === 'admin') {
      const [profileRows] = await conn.execute(
        'SELECT first_name, last_name FROM admins WHERE user_id = ?',
        [userId]
      );
      if (profileRows.length) profileData = profileRows[0];
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
      firstName: profileData.first_name || '',
      lastName: profileData.last_name || '',
      department: profileData.department || '',
      profilePicUrl: profileData.profile_pic_url || '',
      createdAt: user.created_at,
      updatedAt: user.updated_at
    };
  } finally {
    conn.release();
  }
}

export async function updateProfile(userId, updates) {
  const allowed = ['first_name', 'last_name', 'department'];
  const fields = Object.keys(updates).filter((k) => allowed.includes(k));
  if (!fields.length) throw new Error('No valid fields to update');

  const conn = await getConnection();
  try {
    const [userRows] = await conn.execute('SELECT role FROM users WHERE id = ?', [userId]);
    if (!userRows.length) throw new Error('User not found');
    const role = userRows[0].role;

    let tableName;
    if (role === 'student') tableName = 'students';
    else if (role === 'organizer') tableName = 'organizers';
    else if (role === 'admin') tableName = 'admins';
    else throw new Error('Invalid role');

    // Admin profiles don't have department
    const finalFields = role === 'admin' ? fields.filter(f => f !== 'department') : fields;
    if (!finalFields.length) throw new Error('No valid fields to update for this role');

    const setClause = finalFields.map((f) => `${f} = ?`).join(', ');
    const values = finalFields.map((f) => updates[f]);
    values.push(userId);

    await conn.execute(`UPDATE ${tableName} SET ${setClause}, updated_at = NOW() WHERE user_id = ?`, values);
    return await getProfile(userId);
  } finally {
    conn.release();
  }
}

export async function changePassword(userId, { currentPassword, newPassword }) {
  if (!currentPassword || !newPassword) throw new Error('Both passwords required');
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute('SELECT password_hash FROM users WHERE id = ?', [userId]);
    if (!rows.length) throw new Error('User not found');
    const match = await bcrypt.compare(currentPassword, rows[0].password_hash);
    if (!match) throw new Error('Current password incorrect');
    const hashed = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await conn.execute('UPDATE users SET password_hash = ?, updated_at = NOW() WHERE id = ?', [hashed, userId]);
  } finally {
    conn.release();
  }
}

export async function uploadProfilePicture(userId, file) {
  if (!file) throw new Error('No file uploaded');
  const uploadsDir = path.resolve('uploads');
  await fs.mkdir(uploadsDir, { recursive: true });
  const ext = path.extname(file.originalname);
  const dest = path.join(uploadsDir, `user_${userId}${ext}`);
  
  // Handled upload: rename multer temporary file to destination path
  await fs.rename(file.path, dest);
  const url = `/uploads/${path.basename(dest)}`;

  const conn = await getConnection();
  try {
    const [userRows] = await conn.execute('SELECT role FROM users WHERE id = ?', [userId]);
    if (!userRows.length) throw new Error('User not found');
    const role = userRows[0].role;

    let tableName;
    if (role === 'student') tableName = 'students';
    else if (role === 'organizer') tableName = 'organizers';
    else throw new Error('Profile picture upload not allowed for this role');

    await conn.execute(`UPDATE ${tableName} SET profile_pic_url = ?, updated_at = NOW() WHERE user_id = ?`, [url, userId]);
  } finally {
    conn.release();
  }
  return url;
}

// ----------- Admin services -----------
export async function getAllUsers() {
  const conn = await getConnection();
  try {
    // Return a list of all users, joined with profile names if possible
    const [rows] = await conn.execute(`
      SELECT 
        u.id, 
        u.email, 
        u.role, 
        u.status,
        u.created_at as createdAt,
        COALESCE(s.first_name, o.first_name, a.first_name, '') as firstName,
        COALESCE(s.last_name, o.last_name, a.last_name, '') as lastName
      FROM users u
      LEFT JOIN students s ON u.id = s.user_id
      LEFT JOIN organizers o ON u.id = o.user_id
      LEFT JOIN admins a ON u.id = a.user_id
      ORDER BY u.id
    `);
    return rows;
  } finally {
    conn.release();
  }
}

export async function suspendUser(userId) {
  const conn = await getConnection();
  try {
    await conn.execute("UPDATE users SET status = 'suspended', updated_at = NOW() WHERE id = ?", [userId]);
  } finally {
    conn.release();
  }
}

export async function activateUser(userId) {
  const conn = await getConnection();
  try {
    const [userRows] = await conn.execute('SELECT role FROM users WHERE id = ?', [userId]);
    if (!userRows.length) throw new Error('User not found');
    const role = userRows[0].role;
    
    // For organizers, activating should set them to approved. For others, active.
    const status = role === 'organizer' ? 'approved' : 'active';
    await conn.execute('UPDATE users SET status = ?, updated_at = NOW() WHERE id = ?', [status, userId]);
  } finally {
    conn.release();
  }
}

export async function deleteUser(userId) {
  const conn = await getConnection();
  try {
    await conn.execute('DELETE FROM users WHERE id = ?', [userId]);
  } finally {
    conn.release();
  }
}
