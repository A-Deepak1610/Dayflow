import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/env';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';

import prisma from './lib/prisma';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman or server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, origin);
    }
    return callback(null, origin);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use('/api', routes);

// Base route
app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to Odoo X NMIT Backend API',
  });
});

// Global Error Handler
app.use(errorHandler); 

// Start Server
app.listen(config.port, async () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
  try {
    await prisma.$connect();         
    await prisma.$queryRaw`SELECT 1`;
    console.log(`✅ [Database] Successfully connected to TiDB MySQL Database via Prisma`);
  } catch (error: any) {
    console.error(`❌ [Database] Connection failed: ${error?.message || error}`);
  }
});

export default app;
