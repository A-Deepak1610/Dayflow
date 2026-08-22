import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

const getUser = (req: Request) => req.user!;

// --------------------------------------------------------------------------
// EMPLOYEE DIRECTORY & PROFILE
// --------------------------------------------------------------------------

export const getColleagueDirectory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId } = getUser(req);
    const { search, department } = req.query;

    const whereClause: any = {
      companyId,
    };

    if (search) {
      whereClause.OR = [
        { firstName: { contains: String(search) } },
        { lastName: { contains: String(search) } },
        { loginId: { contains: String(search) } },
        { email: { contains: String(search) } },
      ];
    }

    if (department && department !== 'All Departments') {
      whereClause.department = { name: String(department) };
    }

    const colleagues = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        loginId: true,
        department: { select: { id: true, name: true } },
        position: { select: { id: true, title: true } },
        manager: { select: { firstName: true, lastName: true } },
        profile: {
          select: {
            avatarUrl: true,
            location: true,
            skills: true,
            about: true,
            employmentType: true,
            joiningDate: true,
          },
        },
      },
      orderBy: { firstName: 'asc' },
    });

    res.json({ colleagues });
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getUser(req);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        department: true,
        position: true,
        manager: {
          select: { firstName: true, lastName: true, email: true },
        },
        profile: true,
        documents: true,
        salaryStructures: {
          orderBy: { effectiveFrom: 'desc' },
          take: 1,
        },
        company: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const updateMyProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getUser(req);
    const { phone, address, personalEmail, hobbies, skills, avatarUrl } = req.body;

    // Update phone on User table
    if (phone !== undefined) {
      await prisma.user.update({
        where: { id: userId },
        data: { phone: String(phone) },
      });
    }

    // Update permitted fields on EmployeeProfile
    const profile = await prisma.employeeProfile.upsert({
      where: { userId },
      update: {
        address: address ? String(address) : undefined,
        personalEmail: personalEmail ? String(personalEmail) : undefined,
        hobbies: hobbies ? String(hobbies) : undefined,
        skills,
        avatarUrl: avatarUrl ? String(avatarUrl) : undefined,
      },
      create: {
        userId,
        address: address ? String(address) : undefined,
        personalEmail: personalEmail ? String(personalEmail) : undefined,
        hobbies: hobbies ? String(hobbies) : undefined,
        skills,
        avatarUrl: avatarUrl ? String(avatarUrl) : undefined,
      },
    });

    res.json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    next(error);
  }
};

// --------------------------------------------------------------------------
// HR / ADMIN EMPLOYEE MANAGEMENT
// --------------------------------------------------------------------------

export const getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId } = getUser(req);
    const { departmentId, search } = req.query;

    const whereClause: any = { companyId };

    if (departmentId && departmentId !== 'ALL') {
      whereClause.departmentId = String(departmentId);
    }

    if (search) {
      whereClause.OR = [
        { firstName: { contains: String(search) } },
        { lastName: { contains: String(search) } },
        { loginId: { contains: String(search) } },
        { email: { contains: String(search) } },
      ];
    }

    const employees = await prisma.user.findMany({
      where: whereClause,
      include: {
        department: true,
        position: true,
        role: true,
        profile: true,
        salaryStructures: {
          orderBy: { effectiveFrom: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ employees });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const { companyId } = getUser(req);

    const employee = await prisma.user.findFirst({
      where: { id, companyId },
      include: {
        department: true,
        position: true,
        role: true,
        profile: true,
        documents: true,
        salaryStructures: { orderBy: { effectiveFrom: 'desc' } },
        attendances: { orderBy: { date: 'desc' }, take: 30 },
        leaveRequests: { orderBy: { appliedAt: 'desc' }, take: 15, include: { leaveType: true } },
        leaveBalances: { include: { leaveType: true } },
        payrollRecords: { orderBy: { disbursementDate: 'desc' }, take: 12 },
        salaryRevisions: { orderBy: { effectiveDate: 'desc' } },
      },
    });

    if (!employee) {
      return res.status(404).json({ message: 'Employee record not found.' });
    }

    res.json({ employee });
  } catch (error) {
    next(error);
  }
};

export const updateEmployeeByAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const { companyId } = getUser(req);
    const {
      firstName,
      lastName,
      phone,
      departmentId,
      positionId,
      roleId,
      profile,
      salaryConfig,
    } = req.body;

    const existing = await prisma.user.findFirst({
      where: { id, companyId },
    });

    if (!existing) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        firstName: firstName ? String(firstName) : undefined,
        lastName: lastName ? String(lastName) : undefined,
        phone: phone ? String(phone) : undefined,
        departmentId: departmentId ? String(departmentId) : undefined,
        positionId: positionId ? String(positionId) : undefined,
        roleId: roleId ? String(roleId) : undefined,
      },
    });

    if (profile) {
      await prisma.employeeProfile.upsert({
        where: { userId: id },
        update: profile,
        create: { userId: id, ...profile },
      });
    }

    if (salaryConfig && salaryConfig.annualCtc) {
      await prisma.salaryStructure.create({
        data: {
          userId: id,
          annualCtc: Number(salaryConfig.annualCtc),
          basePay: Number(salaryConfig.basePay || salaryConfig.annualCtc * 0.4),
          hra: Number(salaryConfig.hra || salaryConfig.annualCtc * 0.2),
          specialAllowance: Number(salaryConfig.specialAllowance || 0),
          effectiveFrom: new Date(),
          taxRegime: String(salaryConfig.taxRegime || 'New Regime'),
        },
      });
    }

    res.json({ message: 'Employee updated successfully', employee: updatedUser });
  } catch (error) {
    next(error);
  }
};
