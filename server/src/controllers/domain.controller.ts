import {Request, Response, NextFunction} from "express";
import prisma from "../lib/prisma";

const getUser = (req: Request) => req.user!;

export const listEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const employees = await prisma.user.findMany({
      where: {companyId: getUser(req).companyId},
      select: {
        id: true,
        loginId: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        isFirstLogin: true,
        createdAt: true,
        department: {select: {id: true, name: true}},
        position: {select: {id: true, title: true}},
        role: {select: {name: true}},
        profile: true,
      },
      orderBy: {createdAt: "desc"},
    });
    res.json({employees});
  } catch (error) {
    next(error);
  }
};

export const updateMyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allowed = [
      "about",
      "jobInterests",
      "hobbies",
      "skills",
      "certifications",
      "dateOfBirth",
      "address",
      "nationality",
      "gender",
      "maritalStatus",
      "personalEmail",
      "location",
      "employmentType",
      "joiningDate",
      "bankAccountName",
      "bankAccountNumber",
      "bankIfsc",
      "pan",
      "uan",
      "pfNumber",
      "avatarUrl",
    ];
    const data = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowed.includes(key)),
    );
    const profile = await prisma.employeeProfile.upsert({
      where: {userId: getUser(req).userId},
      create: {userId: getUser(req).userId, ...data},
      update: data,
    });
    res.json({profile});
  } catch (error) {
    next(error);
  }
};

export const listMyAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const attendance = await prisma.attendance.findMany({
      where: {userId: getUser(req).userId},
      orderBy: {date: "desc"},
    });
    res.json({attendance});
  } catch (error) {
    next(error);
  }
};

export const clockIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const date = req.body.date
      ? new Date(`${req.body.date}T00:00:00.000Z`)
      : new Date();
    const clockInAt = req.body.clockIn
      ? new Date(req.body.clockIn)
      : new Date();
    const record = await prisma.attendance.upsert({
      where: {userId_date: {userId: getUser(req).userId, date}},
      create: {
        userId: getUser(req).userId,
        date,
        clockIn: clockInAt,
        workMode: req.body.workMode,
        status: "Present",
        notes: req.body.notes,
      },
      update: {
        clockIn: clockInAt,
        workMode: req.body.workMode,
        status: "Present",
        notes: req.body.notes,
      },
    });
    res.status(201).json({attendance: record});
  } catch (error) {
    next(error);
  }
};

export const clockOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const date = req.body.date
      ? new Date(`${req.body.date}T00:00:00.000Z`)
      : new Date();
    const clockOutAt = req.body.clockOut
      ? new Date(req.body.clockOut)
      : new Date();
    const existing = await prisma.attendance.findUnique({
      where: {userId_date: {userId: getUser(req).userId, date}},
    });
    if (!existing?.clockIn)
      return res
        .status(400)
        .json({message: "No clock-in record exists for this date."});
    const totalMinutes = Math.max(
      0,
      Math.floor((clockOutAt.getTime() - existing.clockIn.getTime()) / 60000) -
        existing.breakMinutes,
    );
    const record = await prisma.attendance.update({
      where: {id: existing.id},
      data: {
        clockOut: clockOutAt,
        totalMinutes,
        overtimeMinutes: Math.max(0, totalMinutes - 480),
      },
    });
    res.json({attendance: record});
  } catch (error) {
    next(error);
  }
};

export const listMyLeaves = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const leaves = await prisma.leaveRequest.findMany({
      where: {userId: getUser(req).userId},
      include: {leaveType: true, approvals: true, events: true},
      orderBy: {appliedAt: "desc"},
    });
    res.json({leaves});
  } catch (error) {
    next(error);
  }
};

export const createLeave = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      leaveTypeId,
      startDate,
      endDate,
      workingDays,
      calendarDays,
      weekendDays,
      holidayDays,
      reason,
      handoverUserId,
      handoverNotes,
      attachmentUrl,
      isPaid,
    } = req.body;
    if (!leaveTypeId || !startDate || !endDate || !reason)
      return res
        .status(400)
        .json({message: "leaveTypeId, dates, and reason are required."});
    const leaveType = await prisma.leaveType.findFirst({
      where: {id: leaveTypeId, companyId: getUser(req).companyId, active: true},
    });
    if (!leaveType)
      return res.status(400).json({message: "Leave type not found."});
    const leave = await prisma.leaveRequest.create({
      data: {
        userId: getUser(req).userId,
        leaveTypeId,
        startDate: new Date(`${startDate}T00:00:00.000Z`),
        endDate: new Date(`${endDate}T00:00:00.000Z`),
        workingDays: workingDays ?? calendarDays ?? 1,
        calendarDays: calendarDays ?? 1,
        weekendDays: weekendDays ?? 0,
        holidayDays: holidayDays ?? 0,
        reason,
        handoverUserId,
        handoverNotes,
        attachmentUrl,
        isPaid: isPaid ?? true,
        events: {create: {actorId: getUser(req).userId, event: "Submitted"}},
      },
      include: {leaveType: true, events: true},
    });
    res.status(201).json({leave});
  } catch (error) {
    next(error);
  }
};

export const listNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {userId: getUser(req).userId},
      orderBy: {createdAt: "desc"},
    });
    res.json({notifications});
  } catch (error) {
    next(error);
  }
};

export const markNotificationRead = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const notification = await prisma.notification.updateMany({
      where: {id: String(req.params.id), userId: getUser(req).userId},
      data: {readAt: new Date()},
    });
    if (!notification.count)
      return res.status(404).json({message: "Notification not found."});
    res.json({message: "Notification marked as read."});
  } catch (error) {
    next(error);
  }
};
