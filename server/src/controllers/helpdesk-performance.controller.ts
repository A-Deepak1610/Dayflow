import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

const getUser = (req: Request) => req.user!;

// --------------------------------------------------------------------------
// HELPDESK TICKETS
// --------------------------------------------------------------------------

export const getHelpdeskTickets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId, userId, role } = getUser(req);
    const { status, category, priority } = req.query;

    const whereClause: any = { companyId };

    // Employee sees only their submitted tickets
    if (role === 'EMPLOYEE') {
      whereClause.submitterId = userId;
    }

    if (status && status !== 'ALL') whereClause.status = String(status);
    if (category && category !== 'ALL') whereClause.category = String(category);
    if (priority && priority !== 'ALL') whereClause.priority = String(priority);

    const tickets = await prisma.helpdeskTicket.findMany({
      where: whereClause,
      include: {
        submitter: {
          select: { firstName: true, lastName: true, email: true, loginId: true },
        },
        assignee: {
          select: { firstName: true, lastName: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ tickets });
  } catch (error) {
    next(error);
  }
};

export const createHelpdeskTicket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId, userId } = getUser(req);
    const { subject, description, category, priority, department } = req.body;

    if (!subject || !category) {
      return res.status(400).json({ message: 'Subject and category are required.' });
    }

    const ticket = await prisma.helpdeskTicket.create({
      data: {
        companyId,
        submitterId: userId,
        subject: String(subject),
        description: description ? String(description) : null,
        category: String(category),
        priority: priority ? String(priority) : 'Medium',
        department: department ? String(department) : null,
        status: 'Open',
      },
      include: {
        submitter: true,
      },
    });

    res.status(201).json({ message: 'Helpdesk ticket submitted successfully', ticket });
  } catch (error) {
    next(error);
  }
};

export const updateHelpdeskTicket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const { status, resolutionNote, satisfaction, assigneeId } = req.body;

    const updated = await prisma.helpdeskTicket.update({
      where: { id },
      data: {
        status: status ? String(status) : undefined,
        resolutionNote: resolutionNote ? String(resolutionNote) : undefined,
        satisfaction: satisfaction ? Number(satisfaction) : undefined,
        assigneeId: assigneeId ? String(assigneeId) : undefined,
        resolvedAt: status === 'Resolved' ? new Date() : undefined,
      },
    });

    res.json({ message: 'Ticket updated successfully', ticket: updated });
  } catch (error) {
    next(error);
  }
};

// --------------------------------------------------------------------------
// PERFORMANCE REVIEWS & APPRAISALS
// --------------------------------------------------------------------------

export const getPerformanceReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId, userId, role } = getUser(req);
    const { period } = req.query;

    const whereClause: any = {
      user: { companyId },
    };

    if (role === 'EMPLOYEE') {
      whereClause.userId = userId;
    }

    if (period) {
      whereClause.period = String(period);
    }

    const reviews = await prisma.performanceReview.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            loginId: true,
            department: { select: { name: true } },
            position: { select: { title: true } },
            profile: { select: { avatarUrl: true } },
          },
        },
        reviewer: {
          select: { firstName: true, lastName: true },
        },
        scores: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ reviews });
  } catch (error) {
    next(error);
  }
};
