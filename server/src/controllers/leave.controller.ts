import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

const getUser = (req: Request) => req.user!;

// --------------------------------------------------------------------------
// EMPLOYEE LEAVES
// --------------------------------------------------------------------------

export const getLeaveTypes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId } = getUser(req);
    const leaveTypes = await prisma.leaveType.findMany({
      where: { companyId, active: true },
      orderBy: { createdAt: 'asc' },
    });
    res.json({ leaveTypes });
  } catch (error) {
    next(error);
  }
};

export const getMyLeaveBalances = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, companyId } = getUser(req);
    const currentYear = new Date().getFullYear();

    // Fetch all active leave types
    const leaveTypes = await prisma.leaveType.findMany({
      where: { companyId, active: true },
    });

    // Fetch user's existing balances
    const balances = await prisma.leaveBalance.findMany({
      where: { userId, year: currentYear },
      include: { leaveType: true },
    });

    // Ensure all leave types are represented
    const formattedBalances = leaveTypes.map(lt => {
      const existing = balances.find(b => b.leaveTypeId === lt.id);
      const total = existing ? Number(existing.totalDays) : Number(lt.quota);
      const used = existing ? Number(existing.usedDays) : 0;
      const pending = existing ? Number(existing.pendingDays) : 0;
      const remaining = Math.max(0, total - used - pending);

      return {
        id: existing?.id || `temp-${lt.id}`,
        leaveTypeId: lt.id,
        leaveType: lt,
        totalDays: total,
        usedDays: used,
        pendingDays: pending,
        remainingDays: remaining,
        year: currentYear,
      };
    });

    res.json({ balances: formattedBalances });
  } catch (error) {
    next(error);
  }
};

export const getMyLeaveRequests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getUser(req);
    const { status } = req.query;

    const whereClause: any = { userId };
    if (status && status !== 'ALL') {
      whereClause.status = String(status);
    }

    const leaveRequests = await prisma.leaveRequest.findMany({
      where: whereClause,
      include: {
        leaveType: true,
        approvals: {
          include: {
            reviewer: { select: { firstName: true, lastName: true } },
          },
        },
        events: true,
      },
      orderBy: { appliedAt: 'desc' },
    });

    res.json({ leaveRequests });
  } catch (error) {
    next(error);
  }
};

export const applyLeave = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, companyId } = getUser(req);
    const {
      leaveTypeId,
      startDate,
      endDate,
      calendarDays,
      workingDays,
      weekendDays,
      holidayDays,
      reason,
      handoverUserId,
      handoverNotes,
      attachmentUrl,
      isPaid,
    } = req.body;

    if (!leaveTypeId || !startDate || !endDate || !reason) {
      return res.status(400).json({ message: 'leaveTypeId, startDate, endDate, and reason are required.' });
    }

    const sDate = new Date(`${startDate}T00:00:00.000Z`);
    const eDate = new Date(`${endDate}T00:00:00.000Z`);

    const leave = await prisma.leaveRequest.create({
      data: {
        userId,
        leaveTypeId: String(leaveTypeId),
        startDate: sDate,
        endDate: eDate,
        calendarDays: Number(calendarDays) || 1,
        workingDays: Number(workingDays) || 1,
        weekendDays: Number(weekendDays) || 0,
        holidayDays: Number(holidayDays) || 0,
        reason: String(reason),
        handoverUserId: handoverUserId ? String(handoverUserId) : null,
        handoverNotes: handoverNotes ? String(handoverNotes) : null,
        attachmentUrl: attachmentUrl ? String(attachmentUrl) : null,
        isPaid: isPaid ?? true,
        status: 'Pending',
        events: {
          create: {
            actorId: userId,
            event: 'Application Submitted',
            note: 'Leave request submitted via Employee Self-Service.',
          },
        },
      },
      include: {
        leaveType: true,
        events: true,
      },
    });

    // Update pending balance
    const currentYear = new Date().getFullYear();
    const balance = await prisma.leaveBalance.findUnique({
      where: { userId_leaveTypeId_year: { userId, leaveTypeId: String(leaveTypeId), year: currentYear } },
    });

    if (balance) {
      await prisma.leaveBalance.update({
        where: { id: balance.id },
        data: {
          pendingDays: { increment: Number(workingDays) || 1 },
        },
      });
    }

    res.status(201).json({ message: 'Leave application submitted successfully', leave });
  } catch (error) {
    next(error);
  }
};

export const cancelMyLeave = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getUser(req);
    const id = String(req.params.id);

    const existing = await prisma.leaveRequest.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return res.status(404).json({ message: 'Leave request not found.' });
    }

    if (existing.status !== 'Pending') {
      return res.status(400).json({ message: `Cannot cancel a leave request with status "${existing.status}".` });
    }

    const cancelled = await prisma.leaveRequest.update({
      where: { id },
      data: {
        status: 'Cancelled',
        cancelledAt: new Date(),
        events: {
          create: {
            actorId: userId,
            event: 'Request Cancelled',
            note: 'Cancelled by employee.',
          },
        },
      },
    });

    // Restore pending balance
    const currentYear = new Date().getFullYear();
    const balance = await prisma.leaveBalance.findUnique({
      where: { userId_leaveTypeId_year: { userId, leaveTypeId: existing.leaveTypeId, year: currentYear } },
    });

    if (balance) {
      await prisma.leaveBalance.update({
        where: { id: balance.id },
        data: {
          pendingDays: { decrement: Number(existing.workingDays) },
        },
      });
    }

    res.json({ message: 'Leave request cancelled successfully', leave: cancelled });
  } catch (error) {
    next(error);
  }
};

export const getCompanyHolidays = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId } = getUser(req);
    const holidays = await prisma.holiday.findMany({
      where: { companyId, status: 'Active' },
      orderBy: { date: 'asc' },
    });
    res.json({ holidays });
  } catch (error) {
    next(error);
  }
};

// --------------------------------------------------------------------------
// HR / ADMIN LEAVE MANAGEMENT
// --------------------------------------------------------------------------

export const getAllLeaveRequests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId } = getUser(req);
    const { status, departmentId, search } = req.query;

    const whereClause: any = {
      user: {
        companyId,
      },
    };

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
      ];
    }

    const leaveRequests = await prisma.leaveRequest.findMany({
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
            profile: { select: { avatarUrl: true } },
          },
        },
        leaveType: true,
        approvals: true,
        events: true,
      },
      orderBy: [{ appliedAt: 'desc' }],
    });

    res.json({ leaveRequests });
  } catch (error) {
    next(error);
  }
};

export const reviewLeaveRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId: reviewerId } = getUser(req);
    const id = String(req.params.id);
    const { action, comment } = req.body; // action: 'Approved' | 'Rejected'

    if (!['Approved', 'Rejected'].includes(action)) {
      return res.status(400).json({ message: 'Action must be Approved or Rejected' });
    }

    const existing = await prisma.leaveRequest.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!existing) {
      return res.status(404).json({ message: 'Leave request not found.' });
    }

    const updated = await prisma.leaveRequest.update({
      where: { id },
      data: {
        status: String(action),
        approvedAt: action === 'Approved' ? new Date() : null,
        rejectedAt: action === 'Rejected' ? new Date() : null,
        reviewerComment: comment ? String(comment) : `Leave request ${action.toLowerCase()} by HR.`,
        approvals: {
          create: {
            reviewerId,
            action: String(action),
            comment: comment ? String(comment) : `Reviewed and ${action.toLowerCase()} by People Operations.`,
          },
        },
        events: {
          create: {
            actorId: reviewerId,
            event: `Request ${action}`,
            note: comment ? String(comment) : `Request ${action.toLowerCase()} by HR.`,
          },
        },
      },
      include: { leaveType: true, user: true },
    });

    // Balance reconciliation
    const currentYear = new Date().getFullYear();
    const balance = await prisma.leaveBalance.findUnique({
      where: { userId_leaveTypeId_year: { userId: existing.userId, leaveTypeId: existing.leaveTypeId, year: currentYear } },
    });

    if (balance) {
      const workingDays = Number(existing.workingDays);
      if (action === 'Approved') {
        await prisma.leaveBalance.update({
          where: { id: balance.id },
          data: {
            usedDays: { increment: workingDays },
            pendingDays: { decrement: workingDays },
          },
        });
      } else if (action === 'Rejected') {
        await prisma.leaveBalance.update({
          where: { id: balance.id },
          data: {
            pendingDays: { decrement: workingDays },
          },
        });
      }
    }

    res.json({ message: `Leave request ${action.toLowerCase()} successfully`, leave: updated });
  } catch (error) {
    next(error);
  }
};
