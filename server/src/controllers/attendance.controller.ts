import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

const getUser = (req: Request) => req.user!;

// --------------------------------------------------------------------------
// EMPLOYEE ATTENDANCE
// --------------------------------------------------------------------------

export const getMyAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getUser(req);

    const attendances = await prisma.attendance.findMany({
      where: {
        userId,
      },
      orderBy: { date: 'desc' },
      take: 60,
    });

    // Today's attendance
    const todayStr = new Date().toISOString().split('T')[0];
    const todayDate = new Date(`${todayStr}T00:00:00.000Z`);
    const todayRecord = await prisma.attendance.findFirst({
      where: {
        userId,
        date: todayDate,
      },
    });

    // KPI Metrics calculation
    const presentCount = attendances.filter(a => a.status === 'Present' || a.status === 'On Time').length;
    const lateCount = attendances.filter(a => a.status === 'Late').length;
    const halfDayCount = attendances.filter(a => a.status === 'Half-day').length;
    const totalMinutesWorked = attendances.reduce((acc, a) => acc + (a.totalMinutes || 0), 0);
    const totalOtMinutes = attendances.reduce((acc, a) => acc + (a.overtimeMinutes || 0), 0);

    res.json({
      attendances,
      todayRecord,
      metrics: {
        totalDays: attendances.length,
        presentCount,
        lateCount,
        halfDayCount,
        totalHoursWorked: (totalMinutesWorked / 60).toFixed(1),
        totalOtHours: (totalOtMinutes / 60).toFixed(1),
        averageHoursPerDay: attendances.length > 0 ? (totalMinutesWorked / attendances.length / 60).toFixed(1) : '8.0',
        onTimeRate: attendances.length > 0 ? Math.round(((presentCount) / attendances.length) * 100) : 100,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const clockIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getUser(req);
    const { workMode, notes } = req.body;

    const todayStr = new Date().toISOString().split('T')[0];
    const todayDate = new Date(`${todayStr}T00:00:00.000Z`);
    const now = new Date();

    // Determine status (if after 9:15 AM -> Late)
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const isLate = hours > 9 || (hours === 9 && minutes > 15);

    const record = await prisma.attendance.upsert({
      where: { userId_date: { userId, date: todayDate } },
      create: {
        userId,
        date: todayDate,
        clockIn: now,
        shift: 'General (09:00 AM - 06:00 PM)',
        workMode: workMode ? String(workMode) : 'Office',
        status: isLate ? 'Late' : 'Present',
        notes: notes ? String(notes) : 'Biometric check-in recorded',
      },
      update: {
        clockIn: now,
        workMode: workMode ? String(workMode) : 'Office',
        status: isLate ? 'Late' : 'Present',
        notes: notes ? String(notes) : 'Biometric check-in recorded',
      },
    });

    res.status(201).json({ message: 'Clocked in successfully', attendance: record });
  } catch (error) {
    next(error);
  }
};

export const clockOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getUser(req);
    const todayStr = new Date().toISOString().split('T')[0];
    const todayDate = new Date(`${todayStr}T00:00:00.000Z`);
    const now = new Date();

    const existing = await prisma.attendance.findUnique({
      where: { userId_date: { userId, date: todayDate } },
    });

    if (!existing || !existing.clockIn) {
      return res.status(400).json({ message: 'No clock-in record found for today.' });
    }

    const clockInTime = new Date(existing.clockIn).getTime();
    const clockOutTime = now.getTime();
    const rawDiffMins = Math.max(0, Math.floor((clockOutTime - clockInTime) / (1000 * 60)));
    const breakMins = existing.breakMinutes || 45;
    const totalMinutes = Math.max(0, rawDiffMins - breakMins);
    const overtimeMinutes = Math.max(0, totalMinutes - 480); // 8h = 480 mins

    const updated = await prisma.attendance.update({
      where: { id: existing.id },
      data: {
        clockOut: now,
        breakMinutes: breakMins,
        totalMinutes,
        overtimeMinutes,
      },
    });

    res.json({ message: 'Clocked out successfully', attendance: updated });
  } catch (error) {
    next(error);
  }
};

export const getMyRegularizations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getUser(req);
    const regularizations = await prisma.attendanceRegularization.findMany({
      where: { userId },
      include: {
        reviewer: {
          select: { firstName: true, lastName: true },
        },
      },
      orderBy: { submittedAt: 'desc' },
    });

    res.json({ regularizations });
  } catch (error) {
    next(error);
  }
};

export const submitRegularization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getUser(req);
    const { date: reqDate, requestedClockIn, requestedClockOut, reason } = req.body;

    if (!reqDate || !reason) {
      return res.status(400).json({ message: 'Date and reason are required.' });
    }

    const targetDate = new Date(`${reqDate}T00:00:00.000Z`);
    const existingAtt = await prisma.attendance.findUnique({
      where: { userId_date: { userId, date: targetDate } },
    });

    const regularization = await prisma.attendanceRegularization.create({
      data: {
        userId,
        attendanceId: existingAtt?.id || null,
        date: targetDate,
        originalClockIn: existingAtt?.clockIn || null,
        originalClockOut: existingAtt?.clockOut || null,
        requestedClockIn: requestedClockIn ? new Date(`${reqDate}T${requestedClockIn}:00.000Z`) : null,
        requestedClockOut: requestedClockOut ? new Date(`${reqDate}T${requestedClockOut}:00.000Z`) : null,
        reason: String(reason),
        status: 'Pending',
      },
    });

    res.status(201).json({ message: 'Regularization request submitted successfully', regularization });
  } catch (error) {
    next(error);
  }
};

// --------------------------------------------------------------------------
// HR / ADMIN ATTENDANCE
// --------------------------------------------------------------------------

export const getAllAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId } = getUser(req);
    const { date: filterDate, departmentId, status, search } = req.query;

    const whereClause: any = {
      user: {
        companyId,
      },
    };

    if (filterDate) {
      whereClause.date = new Date(`${filterDate}T00:00:00.000Z`);
    }

    if (status && status !== 'ALL') {
      whereClause.status = String(status);
    }

    if (departmentId && departmentId !== 'ALL') {
      whereClause.user.departmentId = String(departmentId);
    }

    if (search) {
      whereClause.user.OR = [
        { firstName: { contains: String(search) } },
        { lastName: { contains: String(search) } },
        { loginId: { contains: String(search) } },
        { email: { contains: String(search) } },
      ];
    }

    const attendances = await prisma.attendance.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            loginId: true,
            email: true,
            department: { select: { id: true, name: true } },
            position: { select: { id: true, title: true } },
            profile: { select: { avatarUrl: true, location: true } },
          },
        },
      },
      orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
      take: 100,
    });

    res.json({ attendances });
  } catch (error) {
    next(error);
  }
};

export const getAllRegularizations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId } = getUser(req);
    const { status } = req.query;

    const whereClause: any = {
      user: {
        companyId,
      },
    };

    if (status && status !== 'ALL') {
      whereClause.status = String(status);
    }

    const regularizations = await prisma.attendanceRegularization.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            loginId: true,
            email: true,
            department: { select: { name: true } },
            position: { select: { title: true } },
          },
        },
        reviewer: {
          select: { firstName: true, lastName: true },
        },
      },
      orderBy: { submittedAt: 'desc' },
    });

    res.json({ regularizations });
  } catch (error) {
    next(error);
  }
};

export const reviewRegularization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId: reviewerId } = getUser(req);
    const id = String(req.params.id);
    const { action, reviewNote } = req.body; // action: 'Approved' | 'Rejected'

    if (!['Approved', 'Rejected'].includes(action)) {
      return res.status(400).json({ message: 'Action must be Approved or Rejected' });
    }

    const updated = await prisma.attendanceRegularization.update({
      where: { id },
      data: {
        status: String(action),
        reviewNote: reviewNote ? String(reviewNote) : `Request ${action.toLowerCase()} by HR.`,
        reviewerId,
        reviewedAt: new Date(),
      },
      include: { user: true },
    });

    // If approved, update the corresponding attendance record if exists
    if (action === 'Approved' && updated.attendanceId) {
      await prisma.attendance.update({
        where: { id: updated.attendanceId },
        data: {
          status: 'Present',
          notes: `Regularized: ${updated.reason}`,
        },
      });
    }

    res.json({ message: `Regularization request ${action.toLowerCase()}`, regularization: updated });
  } catch (error) {
    next(error);
  }
};
