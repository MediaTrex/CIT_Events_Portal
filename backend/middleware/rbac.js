// backend/middleware/rbac.js
// Role‑Based Access Control (RBAC) middleware

import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret';

/**
 * authenticate – verifies JWT access token and attaches decoded payload to req.user
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(' ')[1]; // Expect "Bearer <token>"
    if (!token) {
      return res.status(401).json({ error: 'Access token missing' });
    }
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = { id: payload.id, email: payload.email, role: payload.role };
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    return res.status(401).json({ error: 'Invalid or expired access token' });
  }
};

/**
 * authorize – factory that receives allowed role(s) and returns middleware
 * Example usage: authorize('admin'), authorize('organizer', 'admin')
 */
export const authorize = (...allowedRoles) => {
  const allowed = allowedRoles.map((r) => r.toString().toLowerCase());
  return (req, res, next) => {
    if (!req.user?.role) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    const role = req.user.role.toString().toLowerCase();
    if (!allowed.includes(role)) {
      return res
        .status(403)
        .json({ error: `Access denied – ${role} role cannot perform this action` });
    }
    next();
  };
};
