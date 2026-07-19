// src/app.js
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import path from "path";
import { fileURLToPath } from "url";

// Swagger UI Setup
import yaml from 'yamljs';
import swaggerUi from 'swagger-ui-express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerDocument = yaml.load(path.join(__dirname, "../swagger.yaml"));


import { getConnection } from '../config/database.js';
import teamRoutes from '../routes/teamRoutes.js';
import notificationRoutes from '../routes/notificationRoutes.js';
import participantRoutes from '../routes/participantRoutes.js';
import errorHandler from '../middleware/errorHandler.js';
import authRoutes from '../routes/authRoutes.js';
import eventRoutes from '../routes/eventRoutes.js';
import dashboardRoutes from '../routes/dashboardRoutes.js';
import userRoutes from '../routes/userRoutes.js';
import adminRoutes from '../routes/adminRoutes.js';
import announcementRoutes from '../routes/announcementRoutes.js';

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Global middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check endpoint (placed before 404 handler to ensure it works)
app.get('/health', async (req, res) => {
  try {
    const conn = await getConnection();
    await conn.query('SELECT 1');
    conn.release();
    res.status(200).json({ status: 'OK', db: 'connected' });
  } catch (err) {
    console.error('Database connection error in health check:', err);
    res.status(500).json({ status: 'ERROR', message: 'Database connection failed' });
  }
});

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/teams', teamRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/announcements', announcementRoutes);

// Admin routes (mounted at both /admin and /api/admin to cover both naming preferences)
app.use('/admin', adminRoutes);
app.use('/api/v1/admin', adminRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Centralized global error handler
app.use(errorHandler);

export default app;
