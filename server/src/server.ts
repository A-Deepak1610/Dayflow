import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';

import prisma from './lib/prisma';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
