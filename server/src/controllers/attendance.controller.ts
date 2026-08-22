import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

/**
 * Helper to get UTC midnight Date object for current day (Prisma @db.Date format)
 */
const getTodayUtcDate = (): Date => {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
};

/**
 * POST /api/attendance/check-in
 * Employee Clock-In Endpoint
 */
export const checkIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId || req.body.userId;
    const notes = req.body.notes || null;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    const todayDate = getTodayUtcDate();
    const now = new Date();

    // Check if user already clocked in today
    const existingAttendance = await prisma.attendance.findUnique({
      where: {
        userId_date: {
          userId,
          date: todayDate,
        },
      },
    });

    if (existingAttendance) {
      return res.status(200).json({
        message: 'Already clocked in for today.',
        attendance: existingAttendance,
      });
    }

    // Determine status: "On Time" if before 9:15 AM local time, else "Late"
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const status = (hours < 9 || (hours === 9 && minutes <= 15)) ? 'On Time' : 'Late';

    const attendance = await prisma.attendance.create({
      data: {
        userId,
        date: todayDate,
        clockIn: now,
        status,
        notes,
      },
    });

    return res.status(201).json({
      message: 'Clocked in successfully!',
      attendance,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/attendance/check-out
 * Employee Clock-Out Endpoint
 */
export const checkOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId || req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    const todayDate = getTodayUtcDate();
    const now = new Date();

    // Find active attendance record for today
    const existingAttendance = await prisma.attendance.findUnique({
      where: {
        userId_date: {
          userId,
          date: todayDate,
        },
      },
    });

    if (!existingAttendance) {
      return res.status(404).json({
        message: 'No active clock-in record found for today. Please clock in first.',
      });
    }

    if (existingAttendance.clockOut) {
      return res.status(200).json({
        message: 'Already clocked out for today.',
        attendance: existingAttendance,
      });
    }

    // Calculate duration in hours if clocked out
    const updatedAttendance = await prisma.attendance.update({
      where: {
        id: existingAttendance.id,
      },
      data: {
        clockOut: now,
      },
    });

    return res.status(200).json({
      message: 'Clocked out successfully!',
      attendance: updatedAttendance,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/attendance/today
 * Get Today's Clock-In Status for Authenticated User
 */
export const getTodayStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId || (req.query.userId as string);

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    const todayDate = getTodayUtcDate();

    const attendance = await prisma.attendance.findUnique({
      where: {
        userId_date: {
          userId,
          date: todayDate,
        },
      },
    });

    return res.status(200).json({
      date: todayDate.toISOString().slice(0, 10),
      hasClockedIn: !!attendance,
      hasClockedOut: !!attendance?.clockOut,
      attendance: attendance || null,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/attendance/history
 * Get Attendance Logs for User or All Employees (HR/Admin)
 */
export const getAttendanceHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId || (req.query.userId as string);
    const limit = Number(req.query.limit) || 30;

    const whereClause = userId ? { userId } : {};

    const history = await prisma.attendance.findMany({
      where: whereClause,
      take: limit,
      orderBy: {
        date: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            loginId: true,
          },
        },
      },
    });

    return res.status(200).json({
      count: history.length,
      history,
    });
  } catch (error) {
    next(error);
  }
};
