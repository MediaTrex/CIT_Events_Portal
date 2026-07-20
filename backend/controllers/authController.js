// Handles incoming HTTP requests for authentication related actions

import { registerUser, loginUser, initiatePasswordReset, resetPassword as resetPasswordService, verifyEmail } from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json({ message: 'User registered. Verification email sent.', userId: result.insertId });
  } catch (err) {
    console.error('Register error:', err);
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { accessToken, refreshToken, user } = await loginUser(req.body);
    // Set refresh token as HttpOnly cookie
    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
    res.json({ accessToken, user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(401).json({ error: err.message });
  }
};

export const logout = async (req, res) => {
  // Clear refresh token cookie
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
};

export const forgotPassword = async (req, res) => {
  try {
    await initiatePasswordReset(req.body.email);
    res.json({ message: 'Password reset email sent if the account exists.' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await resetPasswordService(token, newPassword);
    res.json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(400).json({ error: err.message });
  }
};

export const emailVerification = async (req, res) => {
  try {
    const { token } = req.query;
    await verifyEmail(token);
    res.json({ message: 'Email verified successfully.' });
  } catch (err) {
    console.error('Email verification error:', err);
    res.status(400).json({ error: err.message });
  }
};
