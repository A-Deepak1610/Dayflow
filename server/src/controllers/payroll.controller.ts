import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

const getUser = (req: Request) => req.user!;

// --------------------------------------------------------------------------
// EMPLOYEE PAYROLL & PAYSLIPS (READ-ONLY)
// --------------------------------------------------------------------------

export const getMyPayrollDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getUser(req);

    // Active salary structure
    const salaryStructure = await prisma.salaryStructure.findFirst({
      where: { userId },
      orderBy: { effectiveFrom: 'desc' },
    });

    // Payslips list
    const payslips = await prisma.payslip.findMany({
      where: {
        payrollRecord: { userId },
      },
      include: {
        payrollRecord: true,
        lines: true,
      },
      orderBy: { paymentDate: 'desc' },
    });

    // Salary revisions history
    const salaryRevisions = await prisma.salaryRevision.findMany({
      where: { userId },
      include: {
        approver: { select: { firstName: true, lastName: true } },
      },
      orderBy: { effectiveDate: 'desc' },
    });

    // YTD Aggregates
    const ytdGross = payslips.reduce((acc, p) => acc + Number(p.grossEarnings), 0);
    const ytdDeductions = payslips.reduce((acc, p) => acc + Number(p.totalDeductions), 0);
    const ytdNet = payslips.reduce((acc, p) => acc + Number(p.netPay), 0);

    res.json({
      salaryStructure,
      payslips,
      salaryRevisions,
      ytdSummary: {
        totalGross: ytdGross,
        totalDeductions: ytdDeductions,
        totalNet: ytdNet,
        slipsCount: payslips.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPayslipById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const { userId, role } = getUser(req);

    const payslip = await prisma.payslip.findUnique({
      where: { id },
      include: {
        payrollRecord: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                loginId: true,
                phone: true,
                department: { select: { name: true } },
                position: { select: { title: true } },
                profile: true,
                company: true,
              },
            },
          },
        },
        lines: true,
      },
    });

    if (!payslip) {
      return res.status(404).json({ message: 'Payslip document not found.' });
    }

    // Role-based security: employees can only view their own payslip
    if (role === 'EMPLOYEE' && payslip.payrollRecord?.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized to access this payslip.' });
    }

    res.json({ payslip });
  } catch (error) {
    next(error);
  }
};

// --------------------------------------------------------------------------
// HR / ADMIN PAYROLL MANAGEMENT
// --------------------------------------------------------------------------

export const getAllPayrollRecords = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId } = getUser(req);
    const { month, year, departmentId, status } = req.query;

    const whereClause: any = {
      user: {
        companyId,
      },
    };

    if (month) whereClause.month = Number(month);
    if (year) whereClause.year = Number(year);
    if (status && status !== 'ALL') whereClause.status = String(status);
    if (departmentId && departmentId !== 'ALL') whereClause.user.departmentId = String(departmentId);

    const records = await prisma.payrollRecord.findMany({
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
        payslip: true,
      },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });

    // Summary statistics
    const totalDisbursed = records.reduce((acc, r) => acc + Number(r.netPay), 0);
    const totalGross = records.reduce((acc, r) => acc + Number(r.grossPay), 0);
    const totalDeductions = records.reduce((acc, r) => acc + (Number(r.grossPay) - Number(r.netPay)), 0);

    res.json({
      records,
      analytics: {
        totalHeadcount: records.length,
        totalDisbursed,
        totalGross,
        totalDeductions,
        averageNetPay: records.length > 0 ? Math.round(totalDisbursed / records.length) : 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSalaryStructures = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId } = getUser(req);

    const structures = await prisma.salaryStructure.findMany({
      where: {
        user: { companyId },
      },
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
      },
      orderBy: { effectiveFrom: 'desc' },
    });

    res.json({ structures });
  } catch (error) {
    next(error);
  }
};

export const createSalaryRevision = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId: approverId } = getUser(req);
    const { targetUserId, revisedGross, revisedCtc, changeType, effectiveDate, remarks } = req.body;

    if (!targetUserId || !revisedGross || !revisedCtc) {
      return res.status(400).json({ message: 'targetUserId, revisedGross, and revisedCtc are required.' });
    }

    const revision = await prisma.salaryRevision.create({
      data: {
        userId: String(targetUserId),
        approverId,
        revisedGross: Number(revisedGross),
        revisedCtc: Number(revisedCtc),
        changeType: String(changeType || 'Annual Revision'),
        effectiveDate: effectiveDate ? new Date(`${effectiveDate}T00:00:00.000Z`) : new Date(),
        remarks: remarks || 'Salary revision processed by HR.',
      },
      include: { user: true },
    });

    res.status(201).json({ message: 'Salary revision saved successfully', revision });
  } catch (error) {
    next(error);
  }
};
