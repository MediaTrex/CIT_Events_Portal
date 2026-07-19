import dotenv from 'dotenv';
import http from 'http';
import app from './src/app.js';
import { getConnection, pool } from './config/database.js';
import logger from './src/logger.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    logger.info('Attempting DB connection for health check');
    const conn = await getConnection(3, 1000);
    conn.release();
    logger.info('Database connection verified');
  } catch (err) {
    logger.warn('Database connection failed on startup:', err.message);
    logger.warn('Server will start; DB‑dependent routes may error');
  }

  const server = http.createServer(app);
  server.listen(PORT, () => {
    logger.info(`CIT Event Hub Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });

  const gracefulShutdown = async () => {
    logger.info('Graceful shutdown initiated');
    server.close(async err => {
      if (err) logger.error('Error during server close', err);
      try {
        await pool.end();
        logger.info('Database pool closed');
      } catch (e) {
        logger.error('Error closing DB pool', e);
      }
      process.exit(err ? 1 : 0);
    });
  };

  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
}

startServer();
