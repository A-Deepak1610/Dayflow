import bcrypt from "bcryptjs";
import prisma from "./lib/prisma";

async function main() {
  const hashedPassword = await bcrypt.hash("Dayflow@123", 10);
  
  // 1. Update all existing users with password Dayflow@123
  await prisma.user.updateMany({
    data: { password: hashedPassword }
  });

  // 2. Ensure default company exists
  const company = await prisma.company.findFirst() || await prisma.company.create({
    data: { name: "Dayflow Technologies" }
  });

  const adminRole = await prisma.role.upsert({ where: { name: "ADMIN" }, update: {}, create: { name: "ADMIN" } });
  const hrRole = await prisma.role.upsert({ where: { name: "HR" }, update: {}, create: { name: "HR" } });
  const employeeRole = await prisma.role.upsert({ where: { name: "EMPLOYEE" }, update: {}, create: { name: "EMPLOYEE" } });

  const accounts = [
    { email: "alex.johnson@dayflow.io", loginId: "EMP1000", firstName: "Alex", lastName: "Johnson", roleId: adminRole.id },
    { email: "sarah.williams@dayflow.io", loginId: "EMP1003", firstName: "Sarah", lastName: "Williams", roleId: hrRole.id },
    { email: "admin@dayflow.com", loginId: "DAY-HR-2026-0001", firstName: "Adam", lastName: "Admin", roleId: adminRole.id },
    { email: "hr@dayflow.com", loginId: "HR202601", firstName: "David", lastName: "Miller", roleId: hrRole.id },
    { email: "sophia.chen@dayflow.io", loginId: "EMP1001", firstName: "Sophia", lastName: "Chen", roleId: employeeRole.id },
    { email: "liam.patel@dayflow.io", loginId: "EMP1002", firstName: "Liam", lastName: "Patel", roleId: employeeRole.id },
    { email: "alex.jones@dayflow.com", loginId: "EMP202603", firstName: "Alex", lastName: "Jones", roleId: employeeRole.id },
  ];

  for (const acc of accounts) {
    const user = await prisma.user.upsert({
      where: { email: acc.email },
      update: {
        password: hashedPassword,
        loginId: acc.loginId,
        roleId: acc.roleId,
        firstName: acc.firstName,
        lastName: acc.lastName,
      },
      create: {
        companyId: company.id,
        firstName: acc.firstName,
        lastName: acc.lastName,
        email: acc.email,
        loginId: acc.loginId,
        password: hashedPassword,
        isFirstLogin: false,
        roleId: acc.roleId,
      }
    });

    await prisma.employeeProfile.upsert({
      where: { userId: user.id },
      update: {
        location: "New York HQ",
        employmentType: "Full-time",
      },
      create: {
        userId: user.id,
        about: `${acc.firstName} is a core member of the team.`,
        location: "New York HQ",
        employmentType: "Full-time",
      }
    });
  }

  console.log("SUCCESS: All accounts updated and synchronized with password 'Dayflow@123'");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
