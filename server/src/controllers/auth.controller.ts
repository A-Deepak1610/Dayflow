import {Request, Response} from "express";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";
import {
  generateAccessToken,
  generateRefreshToken,
  setTokenCookies,
  clearTokenCookies,
} from "../utils/jwt";
import {generateEmployeeId, generateRandomPassword} from "../utils/helpers";
import {sendEmployeeWelcomeEmail} from "../utils/mailer";

export const registerCompany = async (req: Request, res: Response) => {
  try {
    const {companyName, firstName, lastName, email, phone, password} = req.body;

    // If an image was uploaded, create the URL path
    let logoUrl = null;
    if (req.file) {
      logoUrl = `/uploads/${req.file.filename}`;
    }

    // Check if company exists
    const existingCompany = await prisma.company.findUnique({
      where: {name: companyName},
    });
    if (existingCompany) {
      return res.status(400).json({message: "Company already exists"});
    }

    // Check if email exists
    const existingUser = await prisma.user.findUnique({where: {email}});
    if (existingUser) {
      return res.status(400).json({message: "Email already exists"});
    }

    // Ensure ADMIN role exists
    let adminRole = await prisma.role.findUnique({where: {name: "ADMIN"}});
    if (!adminRole) {
      adminRole = await prisma.role.create({data: {name: "ADMIN"}});
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Company and Admin User in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {name: companyName, logoUrl},
      });

      const adminUser = await tx.user.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          password: hashedPassword,
          loginId: generateEmployeeId(companyName, firstName, lastName, 1),
          companyId: company.id,
          roleId: adminRole.id,
          isFirstLogin: false, // Admin sets their own password at sign up
          profile: {create: {}},
        },
      });

      return {company, adminUser};
    });

    res.status(201).json({
      message: "Company and Admin account created successfully",
      loginId: result.adminUser.loginId,
    });
  } catch (error: any) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const {firstName, lastName, email, phone, roleName, department} = req.body;
    // req.user is set by auth middleware
    const adminCompanyId = req.user!.companyId;

    // Validate Role (only HR or ADMIN can create, but that's handled by middleware)
    if (!["EMPLOYEE", "HR", "ADMIN"].includes(roleName)) {
      return res.status(400).json({message: "Invalid role"});
    }

    const existingUser = await prisma.user.findUnique({where: {email}});
    if (existingUser) {
      return res.status(400).json({message: "Email already exists"});
    }

    // Ensure Role exists
    let role = await prisma.role.findUnique({where: {name: roleName}});
    if (!role) {
      role = await prisma.role.create({data: {name: roleName}});
    }

    // Get company details for ID generation
    const company = await prisma.company.findUnique({
      where: {id: adminCompanyId},
    });
    if (!company) {
      return res.status(400).json({message: "Company not found"});
    }

    // Generate loginId
    const currentYearUsersCount = await prisma.user.count({
      where: {
        companyId: adminCompanyId,
        createdAt: {gte: new Date(`${new Date().getFullYear()}-01-01`)},
      },
    });
    const loginId = generateEmployeeId(
      company.name,
      firstName,
      lastName,
      currentYearUsersCount + 1,
    );

    // Generate random password & hash it
    const rawPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const departmentRecord = department
      ? await prisma.department.upsert({
          where: {
            companyId_name: {companyId: adminCompanyId, name: department},
          },
          update: {},
          create: {companyId: adminCompanyId, name: department},
        })
      : null;

    const newEmployee = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        loginId,
        companyId: adminCompanyId,
        roleId: role.id,
        isFirstLogin: true,
        departmentId: departmentRecord?.id,
        profile: {create: {}},
      },
    });

    // Send Welcome Email asynchronously
    sendEmployeeWelcomeEmail(email, firstName, loginId, rawPassword);

    res.status(201).json({
      message: "Employee created successfully",
      employee: {
        loginId: newEmployee.loginId,
        email: newEmployee.email,
        generatedPassword: rawPassword, // Send this back so admin can give it to employee if email fails
      },
    });
  } catch (error: any) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const {loginIdOrEmail, password} = req.body;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{loginId: loginIdOrEmail}, {email: loginIdOrEmail}],
      },
      include: {role: true},
    });

    if (!user) {
      return res.status(401).json({message: "Invalid credentials"});
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({message: "Invalid credentials"});
    }

    const tokenPayload = {
      userId: user.id,
      role: user.role.name,
      companyId: user.companyId,
    };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Save refresh token to DB
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    setTokenCookies(res, accessToken, refreshToken);

    res.json({
      message: "Login successful",
      user: {
        loginId: user.loginId,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role.name,
        isFirstLogin: user.isFirstLogin,
      },
    });
  } catch (error: any) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
      // Revoke in DB
      await prisma.refreshToken.updateMany({
        where: {token: refreshToken},
        data: {revoked: true},
      });
    }

    clearTokenCookies(res);
    res.json({message: "Logged out successfully"});
  } catch (error: any) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};
