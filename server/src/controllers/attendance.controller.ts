import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// Clock In (creates a new attendance record for today)
export const clockIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId || req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Check if already clocked in today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingLog = await prisma.attendance.findFirst({
      where: {
        userId,
        date: today,
      },
    });

    if (existingLog) {
      res.status(400).json({ message: 'Already clocked in for today.' });
      return;
    }

    const clockInTime = new Date();
    // Simple logic: if clocked in after 9:15 AM, status is 'Late', else 'On Time'
    const status = (clockInTime.getHours() > 9 || (clockInTime.getHours() === 9 && clockInTime.getMinutes() > 15)) ? 'Late' : 'On Time';

    const log = await prisma.attendance.create({
      data: {
        userId,
        date: today,
        clockIn: clockInTime,
        status,
      },
    });

    res.status(201).json({ message: 'Clocked in successfully', log });
  } catch (error: any) {
    console.error('Error clocking in:', error);
    res.status(500).json({ message: 'Server error clocking in' });
  }
};

// Clock Out (updates today's record)
export const clockOut = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId || req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingLog = await prisma.attendance.findFirst({
      where: {
        userId,
        date: today,
      },
    });

    if (!existingLog) {
      res.status(400).json({ message: 'No clock-in record found for today.' });
      return;
    }

    if (existingLog.clockOut) {
      res.status(400).json({ message: 'Already clocked out for today.' });
      return;
    }

    const log = await prisma.attendance.update({
      where: { id: existingLog.id },
      data: { clockOut: new Date() },
    });

    res.status(200).json({ message: 'Clocked out successfully', log });
  } catch (error: any) {
    console.error('Error clocking out:', error);
    res.status(500).json({ message: 'Server error clocking out' });
  }
};

// Get My Attendance Logs
export const getMyAttendance = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId || req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const logs = await prisma.attendance.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 30, // Last 30 days
    });

    res.status(200).json({ logs });
  } catch (error: any) {
    console.error('Error fetching attendance logs:', error);
    res.status(500).json({ message: 'Server error fetching attendance logs' });
  }
};
