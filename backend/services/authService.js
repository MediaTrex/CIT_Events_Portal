// services/authService.js
// Core business logic for authentication (register, login, password reset, email verification)

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { getConnection } from '../config/database.js';

const SALT_ROUNDS = 12;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';
const JWT_EMAIL_SECRET = process.env.JWT_EMAIL_SECRET || 'email_secret'; // for verification & reset
const ACCESS_EXPIRES_IN = '15m';
const REFRESH_EXPIRES_IN = '7d';

// Nodemailer transporter (basic example – uses env vars)
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT) || 587,
  secure: process.env.MAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/** Helper to send email */
async function sendMail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM || 'no-reply@cithub.com',
      to,
      subject,
      html,
    });
  } catch (err) {
    console.warn('Mail delivery skipped or failed:', err.message);
  }
}

/** Register a new user */
export async function registerUser({ email, password, firstName, lastName, role = 'student', department = null }) {
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const conn = await getConnection();
  try {
    // Determine initial status based on role
    const initialStatus = role === 'organizer' ? 'pending' : 'active';
    const [result] = await conn.execute(
      `INSERT INTO users (email, password_hash, role, status, created_at, updated_at) VALUES (?,?,?,?,?,?)`,
      [email, hashed, role, initialStatus, new Date(), new Date()]
    );
    const userId = result.insertId;

    // Create profile row depending on the role
    if (role === 'student') {
      await conn.execute(
        `INSERT INTO students (user_id, first_name, last_name, department, created_at, updated_at) VALUES (?,?,?,?,?,?)`,
        [userId, firstName, lastName, department, new Date(), new Date()]
      );
    } else if (role === 'organizer') {
      await conn.execute(
        `INSERT INTO organizers (user_id, first_name, last_name, department, created_at, updated_at) VALUES (?,?,?,?,?,?)`,
        [userId, firstName, lastName, department, new Date(), new Date()]
      );
    } else if (role === 'admin') {
      await conn.execute(
        `INSERT INTO admins (user_id, first_name, last_name, created_at, updated_at) VALUES (?,?,?,?,?)`,
        [userId, firstName, lastName, new Date(), new Date()]
      );
    }

    // Email verification token (expires in 24h)
    const emailToken = jwt.sign({ email, type: 'verify' }, JWT_EMAIL_SECRET, { expiresIn: '24h' });
    const verifyUrl = `${process.env.FRONTEND_URI || 'http://localhost:3000'}/verify-email?token=${emailToken}`;
    await sendMail(email, 'Verify your CIT Event Hub account', `<p>Please verify your email by clicking <a href="${verifyUrl}">here</a>.</p>`);

    return result; // contains insertId
  } finally {
    conn.release();
  }
}

/** Login */
export async function loginUser({ email, password }) {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(`SELECT * FROM users WHERE email = ?`, [email]);
    const user = rows[0];
    if (!user) throw new Error('Invalid credentials');
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) throw new Error('Invalid credentials');

    // Block login based on status
    if (user.role === 'organizer') {
      if (user.status === 'pending') {
        throw new Error('Your organizer account is pending approval by admin');
      } else if (user.status === 'rejected') {
        throw new Error('Your organizer registration has been rejected');
      }
    }

    if (user.status === 'suspended') {
      throw new Error('Your account has been suspended');
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
    return { accessToken, refreshToken, user: { id: user.id, email: user.email, role: user.role, status: user.status } };
  } finally {
    conn.release();
  }
}

/** Initiate password reset */
export async function initiatePasswordReset(email) {
  const token = jwt.sign({ email, type: 'reset' }, JWT_EMAIL_SECRET, { expiresIn: '1h' });
  const resetUrl = `${process.env.FRONTEND_URI || 'http://localhost:3000'}/reset-password?token=${token}`;
  await sendMail(email, 'Reset your CIT Event Hub password', `<p>Reset your password by clicking <a href="${resetUrl}">here</a>. This link expires in 1 hour.</p>`);
}

/** Reset password */
export async function resetPassword(token, newPassword) {
  let payload;
  try {
    payload = jwt.verify(token, JWT_EMAIL_SECRET);
  } catch (e) {
    throw new Error('Invalid or expired token');
  }
  if (payload.type !== 'reset') throw new Error('Invalid token type');
  const hashed = await bcrypt.hash(newPassword, SALT_ROUNDS);
  const conn = await getConnection();
  try {
    await conn.execute(`UPDATE users SET password_hash = ?, updated_at = ? WHERE email = ?`, [hashed, new Date(), payload.email]);
  } finally {
    conn.release();
  }
}

/** Verify email */
export async function verifyEmail(token) {
  let payload;
  try {
    payload = jwt.verify(token, JWT_EMAIL_SECRET);
  } catch (e) {
    throw new Error('Invalid or expired token');
  }
  if (payload.type !== 'verify') throw new Error('Invalid token type');
  
  const conn = await getConnection();
  try {
    // Update users table status or set verified if flag existed. Since we do not have specific verified column in current schema, we can keep role=role update.
    await conn.execute(`UPDATE users SET updated_at = NOW() WHERE email = ?`, [payload.email]);
  } finally {
    conn.release();
  }
}

/** Refresh access token */
export async function refreshAccessToken(refreshToken) {
  const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
  const newAccess = jwt.sign({ id: payload.id, email: payload.email, role: payload.role }, JWT_ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
  return newAccess;
}
