// config/database.js
// MySQL connection pool using mysql2/promise
// Loads environment variables from .env
// Provides auto‑reconnect logic and centralised error handling

import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

// Create a pool using environment variables.
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'cit_event_hub',
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: 0,
  keepAliveInitialDelay: 10000,
  enableKeepAlive: true
});

// Centralised error handling for pool
pool.on('error', (err) => {
  console.error('Database connection pool error:', err.message);
});

// Helper function to acquire a connection with auto‑reconnect / retry logic
export async function getConnection(retries = 5, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await pool.getConnection();
      return connection;
    } catch (err) {
      console.error(`Database connection attempt ${i + 1} failed: ${err.message}`);
      if (i === retries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
