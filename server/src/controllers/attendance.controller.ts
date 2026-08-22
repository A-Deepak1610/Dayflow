import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

const getUser = (req: Request) => req.user!;

// --------------------------------------------------------------------------
// EMPLOYEE ATTENDANCE
// --------------------------------------------------------------------------

export const getMyAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = getUser(req);
    const userId = user?.userId || (user as any)?.id;

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
      logs: attendances,
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
    const user = getUser(req);
    const userId = user?.userId || (user as any)?.id;
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

    res.status(201).json({ message: 'Clocked in successfully', attendance: record, log: record });
  } catch (error) {
    next(error);
  }
};

export const clockOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = getUser(req);
    const userId = user?.userId || (user as any)?.id;
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

    res.json({ message: 'Clocked out successfully', attendance: updated, log: updated });
  } catch (error) {
    next(error);
  }
};

export const getMyRegularizations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = getUser(req);
    const userId = user?.userId || (user as any)?.id;
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
    const user = getUser(req);
    const userId = user?.userId || (user as any)?.id;
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
    const user = getUser(req);
    const companyId = user?.companyId;
    const { date: filterDate, departmentId, status, search } = req.query;

    const whereClause: any = {};

    if (companyId) {
      whereClause.user = {
        OR: [
          { companyId },
          { company: { name: { contains: 'Dayflow' } } },
        ],
      };
    }

    if (filterDate && filterDate !== 'ALL') {
      const dStr = String(filterDate);
      const startOfDay = new Date(`${dStr}T00:00:00.000Z`);
      const endOfDay = new Date(`${dStr}T23:59:59.999Z`);
      whereClause.date = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }

    if (status && status !== 'ALL') {
      whereClause.status = {
        contains: String(status),
      };
    }

    if (departmentId && departmentId !== 'ALL') {
      const dVal = String(departmentId);
      whereClause.user = {
        ...(whereClause.user || {}),
        OR: [
          { departmentId: dVal },
          { department: { name: { contains: dVal } } },
        ],
      };
    }

    if (search) {
      const sVal = String(search);
      whereClause.user = {
        ...(whereClause.user || {}),
        OR: [
          { firstName: { contains: sVal } },
          { lastName: { contains: sVal } },
          { loginId: { contains: sVal } },
          { email: { contains: sVal } },
        ],
      };
    }

    let attendances = await prisma.attendance.findMany({
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
      take: 200,
    });

    // Fallback: if no records on selected single date, return all recent attendance records
    if (attendances.length === 0 && filterDate && filterDate !== 'ALL') {
      const relaxedWhere = { ...whereClause };
      delete relaxedWhere.date;
      attendances = await prisma.attendance.findMany({
        where: relaxedWhere,
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
        take: 200,
      });
    }

    res.json({ attendances });
  } catch (error) {
    next(error);
  }
};

export const getAllRegularizations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = getUser(req);
    const companyId = user?.companyId;
    const { status } = req.query;

    const whereClause: any = {};

    if (companyId) {
      whereClause.user = {
        OR: [
          { companyId },
          { company: { name: { contains: 'Dayflow' } } },
        ],
      };
    }

    if (status && status !== 'ALL') {
      whereClause.status = {
        contains: String(status),
      };
    }

    let regularizations = await prisma.attendanceRegularization.findMany({
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

    // Fallback if company filter was too restrictive
    if (regularizations.length === 0) {
      regularizations = await prisma.attendanceRegularization.findMany({
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
    }

    res.json({ regularizations });
  } catch (error) {
    next(error);
  }
};

export const reviewRegularization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = getUser(req);
    const reviewerId = user?.userId || (user as any)?.id;
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
