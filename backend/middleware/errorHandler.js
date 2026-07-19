// middleware/errorHandler.js
// Centralized error handling using winston for structured logs

import logger from '../src/logger.js';

export default function errorHandler(err, req, res, next) {
  logger.error('API Error', { error: err.message, stack: err.stack });

  const statusCode = err.statusCode || (err.message && err.message.includes('not found') ? 404 : 400);
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: message,
    // Expose stack trace only in non‑production environments
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
}
