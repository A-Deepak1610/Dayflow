import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import process from 'node:process';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Create or upsert Company
  const company = await prisma.company.upsert({
    where: { name: 'Dayflow Technologies' },
    update: {},
    create: {
      name: 'Dayflow Technologies',
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
    },
  });
  console.log(`✅ Company ready: ${company.name}`);

  // 2. Create or upsert Roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN' },
  });

  const hrRole = await prisma.role.upsert({
    where: { name: 'HR' },
    update: {},
    create: { name: 'HR' },
  });

  const employeeRole = await prisma.role.upsert({
    where: { name: 'EMPLOYEE' },
    update: {},
    create: { name: 'EMPLOYEE' },
  });
  console.log('✅ Roles initialized: ADMIN, HR, EMPLOYEE');

  // 3. Seed Users
  const defaultPassword = await bcrypt.hash('password123', 10);

  const usersData = [
    {
      loginId: 'ADMIN202601',
      email: 'admin@dayflow.com',
      firstName: 'Sarah',
      lastName: 'Connor',
      phone: '+1 555-0101',
      roleId: adminRole.id,
      isFirstLogin: false,
    },
    {
      loginId: 'HR202601',
      email: 'hr@dayflow.com',
      firstName: 'David',
      lastName: 'Miller',
      phone: '+1 555-0102',
      roleId: hrRole.id,
      isFirstLogin: false,
    },
    {
      loginId: 'EMP202601',
      email: 'john.doe@dayflow.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1 555-0103',
      roleId: employeeRole.id,
      isFirstLogin: false,
    },
    {
      loginId: 'EMP202602',
      email: 'jane.smith@dayflow.com',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+1 555-0104',
      roleId: employeeRole.id,
      isFirstLogin: false,
    },
    {
      loginId: 'EMP202603',
      email: 'alex.jones@dayflow.com',
      firstName: 'Alex',
      lastName: 'Jones',
      phone: '+1 555-0105',
      roleId: employeeRole.id,
      isFirstLogin: false,
    },
  ];

  const createdUsers = [];
  for (const u of usersData) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {
        firstName: u.firstName,
        lastName: u.lastName,
        phone: u.phone,
        roleId: u.roleId,
      },
      create: {
        companyId: company.id,
        loginId: u.loginId,
        email: u.email,
        password: defaultPassword,
        firstName: u.firstName,
        lastName: u.lastName,
        phone: u.phone,
        roleId: u.roleId,
        isFirstLogin: u.isFirstLogin,
      },
    });
    createdUsers.push(user);
    console.log(`  👤 User ready: ${user.firstName} ${user.lastName} (${user.email})`);
  }

  // 4. Seed Attendance Records
  console.log('⏱️ Seeding attendance logs...');
  const employeeUsers = createdUsers.filter((u) => u.email.includes('dayflow.com'));
  const now = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    date.setHours(0, 0, 0, 0);

    for (const user of employeeUsers) {
      const clockIn = new Date(date);
      clockIn.setHours(9, Math.floor(Math.random() * 20), 0);

      const clockOut = new Date(date);
      clockOut.setHours(17, 30 + Math.floor(Math.random() * 30), 0);

      const statuses = ['On Time', 'On Time', 'On Time', 'Late', 'On Time'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      await prisma.attendance.upsert({
        where: {
          userId_date: {
            userId: user.id,
            date: date,
          },
        },
        update: {
          status,
          clockIn,
          clockOut,
        },
        create: {
          userId: user.id,
          date: date,
          clockIn,
          clockOut,
          status,
          notes: status === 'Late' ? 'Traffic delay on highway' : 'Regular workday',
        },
      });
    }
  }
  console.log('✅ Attendance records populated for past 7 days');

  // 5. Seed Salary / Payroll Records
  console.log('💵 Seeding payroll records...');
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  for (const user of employeeUsers) {
    const baseSalary = 5000 + Math.floor(Math.random() * 3000);
    const allowances = 500;
    const deductions = 300;
    const netSalary = baseSalary + allowances - deductions;

    await prisma.salary.upsert({
      where: {
        userId_month_year: {
          userId: user.id,
          month: currentMonth,
          year: currentYear,
        },
      },
      update: {
        baseSalary,
        allowances,
        deductions,
        netSalary,
        status: 'Paid',
      },
      create: {
        userId: user.id,
        month: currentMonth,
        year: currentYear,
        baseSalary,
        allowances,
        deductions,
        netSalary,
        status: 'Paid',
      },
    });
  }
  console.log('✅ Salary records populated for current month');

  console.log('🎉 Database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
