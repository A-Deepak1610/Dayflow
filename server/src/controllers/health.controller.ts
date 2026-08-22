import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

export const checkHealth = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    let dbStatus = 'disconnected';
    let dbError: string | null = null;
    let userCount = 0;

    try {
      // Test Prisma connection to TiDB database
      await prisma.$queryRaw`SELECT 1`;
      dbStatus = 'connected';
      userCount = await prisma.user.count();
    } catch (error: any) {
      dbStatus = 'error';
      dbError = error?.message || 'Database connection failed';
    }

    res.status(200).json({
      status: 'ok',
      service: 'odoo-X-nmit-backend',
      timestamp: new Date().toISOString(),
      database: {
        provider: 'mysql (TiDB)',
        status: dbStatus,
        error: dbError,
        userCount,
      },
    });
  } catch (err) {
    next(err);
  }
};
