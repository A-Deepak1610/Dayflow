import bcrypt from "bcryptjs";
import {PrismaClient, Prisma} from "@prisma/client";

const prisma = new PrismaClient();
const demoCompanyName = "Dayflow Demo Company";
const date = (value: string) => new Date(`${value}T00:00:00.000Z`);
const id = (prefix: string, index: number) =>
  `seed-${prefix}-${String(index).padStart(2, "0")}`;
const money = (value: number) => new Prisma.Decimal(value.toFixed(2));

const departments = [
  "Engineering",
  "Product",
  "Design",
  "Finance",
  "Human Resources",
  "Sales",
  "Marketing",
  "Operations",
  "Customer Success",
  "Legal",
  "Information Technology",
  "Procurement",
  "Quality Assurance",
  "Administration",
  "Research",
];
const positions = [
  "Software Engineer",
  "Product Manager",
  "UX Designer",
  "Financial Analyst",
  "HR Specialist",
  "Sales Executive",
  "Marketing Manager",
  "Operations Lead",
  "Customer Success Manager",
  "Legal Counsel",
  "IT Administrator",
  "Procurement Officer",
  "QA Engineer",
  "Office Administrator",
  "Research Analyst",
];
const firstNames = [
  "Aarav",
  "Diya",
  "Arjun",
  "Ananya",
  "Kabir",
  "Meera",
  "Rohan",
  "Isha",
  "Vivaan",
  "Nisha",
  "Aditya",
  "Sara",
  "Karan",
  "Tara",
  "Neil",
];
const lastNames = [
  "Sharma",
  "Patel",
  "Kumar",
  "Reddy",
  "Singh",
  "Nair",
  "Joshi",
  "Iyer",
  "Gupta",
  "Mehta",
  "Rao",
  "Menon",
  "Das",
  "Verma",
  "Bose",
];
const leaveNames = [
  "Annual Leave",
  "Sick Leave",
  "Casual Leave",
  "Compensatory Off",
  "Maternity Leave",
  "Paternity Leave",
  "Bereavement Leave",
  "Unpaid Leave",
  "Study Leave",
  "Marriage Leave",
  "Wellness Leave",
  "Relocation Leave",
  "Volunteer Leave",
  " sabbatical Leave",
  "Optional Holiday",
];

async function main() {
  const company = await prisma.company.upsert({
    where: {name: demoCompanyName},
    update: {logoUrl: "/uploads/dayflow-demo-logo.png"},
    create: {name: demoCompanyName, logoUrl: "/uploads/dayflow-demo-logo.png"},
  });
  const roles = await Promise.all(
    ["ADMIN", "HR", "EMPLOYEE"].map((name) =>
      prisma.role.upsert({where: {name}, update: {}, create: {name}}),
    ),
  );
  const adminRole = roles.find((role) => role.name === "ADMIN")!;
  const employeeRole = roles.find((role) => role.name === "EMPLOYEE")!;
  const password = await bcrypt.hash("Dayflow@123", 10);

  const departmentRecords = await Promise.all(
    departments.map((name) =>
      prisma.department.upsert({
        where: {companyId_name: {companyId: company.id, name}},
        update: {description: `${name} department`},
        create: {
          companyId: company.id,
          name,
          description: `${name} department`,
        },
      }),
    ),
  );
  const positionRecords = await Promise.all(
    positions.map((title, index) =>
      prisma.jobPosition.upsert({
        where: {companyId_title: {companyId: company.id, title}},
        update: {departmentId: departmentRecords[index].id},
        create: {
          companyId: company.id,
          title,
          departmentId: departmentRecords[index].id,
          description: `${title} role`,
        },
      }),
    ),
  );

  const hrRole = roles.find((role) => role.name === "HR")!;

  const namedUsers = [
    {
      id: "seed-user-alex",
      email: "alex.johnson@dayflow.io",
      loginId: "EMP1000",
      firstName: "Alex",
      lastName: "Johnson",
      roleId: adminRole.id,
      deptIndex: 0,
      posIndex: 0,
    },
    {
      id: "seed-user-sarah",
      email: "sarah.williams@dayflow.io",
      loginId: "EMP1003",
      firstName: "Sarah",
      lastName: "Williams",
      roleId: hrRole.id,
      deptIndex: 4,
      posIndex: 4,
    },
    {
      id: "seed-user-sophia",
      email: "sophia.chen@dayflow.io",
      loginId: "EMP1001",
      firstName: "Sophia",
      lastName: "Chen",
      roleId: employeeRole.id,
      deptIndex: 0,
      posIndex: 0,
    },
    {
      id: "seed-user-liam",
      email: "liam.patel@dayflow.io",
      loginId: "EMP1002",
      firstName: "Liam",
      lastName: "Patel",
      roleId: employeeRole.id,
      deptIndex: 1,
      posIndex: 1,
    },
    {
      id: "seed-user-marcus",
      email: "marcus.vance@dayflow.io",
      loginId: "EMP1004",
      firstName: "Marcus",
      lastName: "Vance",
      roleId: employeeRole.id,
      deptIndex: 2,
      posIndex: 2,
    },
    {
      id: "seed-user-admin-legacy",
      email: "admin@dayflow.com",
      loginId: "DAY-HR-2026-0001",
      firstName: "Adam",
      lastName: "Admin",
      roleId: adminRole.id,
      deptIndex: 0,
      posIndex: 0,
    }
  ];

  for (const nu of namedUsers) {
    const targetUser = await prisma.user.upsert({
      where: { email: nu.email },
      update: {
        password,
        loginId: nu.loginId,
        roleId: nu.roleId,
        firstName: nu.firstName,
        lastName: nu.lastName,
      },
      create: {
        companyId: company.id,
        firstName: nu.firstName,
        lastName: nu.lastName,
        email: nu.email,
        loginId: nu.loginId,
        password,
        isFirstLogin: false,
        roleId: nu.roleId,
        departmentId: departmentRecords[nu.deptIndex].id,
        positionId: positionRecords[nu.posIndex].id,
      }
    });

    await prisma.employeeProfile.upsert({
      where: { userId: targetUser.id },
      update: {
        address: "742 Evergreen Terrace, New York, NY",
        employmentType: "Full-time",
      },
      create: {
        userId: targetUser.id,
        about: `${nu.firstName} is a core contributor at Dayflow.`,
        jobInterests: "Enterprise SaaS & HR Tech",
        hobbies: "Reading, technology and travel",
        skills: ["Strategy", "Leadership", "Communication"],
        certifications: ["Dayflow Certified Professional"],
        dateOfBirth: date("1992-05-15"),
        address: "742 Evergreen Terrace, New York, NY",
        nationality: "American",
        gender: "Female",
        maritalStatus: "Single",
        personalEmail: nu.email,
        location: "New York HQ, Floor 4",
        employmentType: "Full-time",
        joiningDate: date("2023-01-15"),
        bankAccountName: `${nu.firstName} ${nu.lastName}`,
        bankAccountNumber: "DFBK00998822",
        bankIfsc: "DFBK0001234",
        pan: "ABCDE1234F",
        uan: "100000000099",
        pfNumber: "PF/DF/99",
      }
    });
  }

  const users = [] as Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }>;
  for (let index = 0; index < 15; index += 1) {
    const userId = id("user", index + 1);
    const user = await prisma.user.upsert({
      where: {id: userId},
      update: {
        firstName: firstNames[index],
        lastName: lastNames[index],
        departmentId: departmentRecords[index].id,
        positionId: positionRecords[index].id,
        password,
      },
      create: {
        id: userId,
        companyId: company.id,
        firstName: firstNames[index],
        lastName: lastNames[index],
        email: `demo.employee${index + 1}@dayflow.test`,
        loginId: `DFDEMO2026${String(index + 1).padStart(4, "0")}`,
        password,
        isFirstLogin: false,
        roleId: index === 0 ? adminRole.id : employeeRole.id,
        departmentId: departmentRecords[index].id,
        positionId: positionRecords[index].id,
      },
    });
    users.push(user);
  }
  const admin = users[0];

  for (let index = 0; index < users.length; index += 1) {
    const user = users[index];
    await prisma.employeeProfile.upsert({
      where: {userId: user.id},
      update: {
        location: `Building ${String.fromCharCode(65 + (index % 3))}, Floor ${(index % 4) + 1}`,
        employmentType: index % 4 === 0 ? "Contract" : "Full-time",
      },
      create: {
        id: id("profile", index + 1),
        userId: user.id,
        about: `${user.firstName} is a valued member of the Dayflow team.`,
        jobInterests: "Professional growth and collaborative projects",
        hobbies: "Reading, music and travel",
        skills: ["Communication", "Teamwork", positions[index]],
        certifications: [`Dayflow ${positions[index]} Certificate`],
        dateOfBirth: date(`199${index % 10}-0${(index % 8) + 1}-1${index % 9}`),
        address: `${index + 1} Dayflow Avenue`,
        nationality: "Indian",
        gender: index % 2 === 0 ? "Female" : "Male",
        maritalStatus: index % 3 === 0 ? "Married" : "Single",
        personalEmail: `personal${index + 1}@example.test`,
        location: `Building ${String.fromCharCode(65 + (index % 3))}, Floor ${(index % 4) + 1}`,
        employmentType: index % 4 === 0 ? "Contract" : "Full-time",
        joiningDate: date(`202${index % 5}-0${(index % 8) + 1}-1${index % 9}`),
        bankAccountName: `${user.firstName} ${user.lastName}`,
        bankAccountNumber: `DAYFLOW${String(index + 1).padStart(8, "0")}`,
        bankIfsc: "DFBK0001234",
        pan: `DAYF${String(index + 1).padStart(5, "A")}P`,
        uan: `100000000${index + 1}`,
        pfNumber: `PF/DF/${index + 1}`,
      },
    });

    await prisma.employeeDocument.upsert({
      where: {id: id("document", index + 1)},
      update: {name: `${user.firstName} identity document`},
      create: {
        id: id("document", index + 1),
        userId: user.id,
        name: `${user.firstName} identity document`,
        category: "Identity",
        fileUrl: `/uploads/demo/document-${index + 1}.pdf`,
      },
    });

    const attendanceDate = date(
      `2026-08-${String(index + 1).padStart(2, "0")}`,
    );
    const attendance = await prisma.attendance.upsert({
      where: {userId_date: {userId: user.id, date: attendanceDate}},
      update: {status: index % 5 === 0 ? "Late" : "Present"},
      create: {
        id: id("attendance", index + 1),
        userId: user.id,
        date: attendanceDate,
        clockIn: new Date(
          `2026-08-${String(index + 1).padStart(2, "0")}T09:0${index % 6}:00.000Z`,
        ),
        clockOut: new Date(
          `2026-08-${String(index + 1).padStart(2, "0")}T18:00:00.000Z`,
        ),
        shift: "09:00 AM - 06:00 PM",
        workMode: index % 3 === 0 ? "Remote WFH" : "Office",
        breakMinutes: 60,
        totalMinutes: 480 + (index % 3) * 15,
        overtimeMinutes: (index % 3) * 15,
        status: index % 5 === 0 ? "Late" : "Present",
        notes: "Seed attendance record",
      },
    });
    await prisma.attendanceRegularization.upsert({
      where: {id: id("regularization", index + 1)},
      update: {status: index % 3 === 0 ? "Approved" : "Pending"},
      create: {
        id: id("regularization", index + 1),
        userId: user.id,
        reviewerId: admin.id,
        attendanceId: attendance.id,
        date: attendanceDate,
        originalClockIn: attendance.clockIn,
        originalClockOut: attendance.clockOut,
        requestedClockIn: attendance.clockIn,
        requestedClockOut: attendance.clockOut,
        reason: "Correction requested for seed attendance record",
        status: index % 3 === 0 ? "Approved" : "Pending",
        reviewNote: index % 3 === 0 ? "Reviewed by HR" : null,
      },
    });
  }

  const leaveTypes = await Promise.all(
    leaveNames.map((name, index) =>
      prisma.leaveType.upsert({
        where: {companyId_name: {companyId: company.id, name: name.trim()}},
        update: {},
        create: {
          id: id("leave-type", index + 1),
          companyId: company.id,
          name: name.trim(),
          quota: money(index === 7 ? 0 : 12 + (index % 5)),
          purpose: `${name.trim()} policy`,
          noticePeriodDays: index % 4,
          maxContinuousDays: 10 + (index % 6),
          carryForward: index % 2 === 0,
          documentationRequired: index % 3 === 0,
          approvalWorkflow: "Manager then HR",
        },
      }),
    ),
  );

  for (let index = 0; index < 15; index += 1) {
    const user = users[index];
    const leaveType = leaveTypes[index];
    await prisma.leaveBalance.upsert({
      where: {
        userId_leaveTypeId_year: {
          userId: user.id,
          leaveTypeId: leaveType.id,
          year: 2026,
        },
      },
      update: {},
      create: {
        id: id("leave-balance", index + 1),
        userId: user.id,
        leaveTypeId: leaveType.id,
        year: 2026,
        totalDays: money(12 + (index % 5)),
        usedDays: money(index % 4),
        pendingDays: money(index % 3),
        adjustedDays: money(index % 2),
      },
    });
    const start = date(`2026-09-${String(index + 1).padStart(2, "0")}`);
    const end = date(`2026-09-${String(index + 2).padStart(2, "0")}`);
    const leave = await prisma.leaveRequest.upsert({
      where: {id: id("leave-request", index + 1)},
      update: {status: index % 4 === 0 ? "Approved" : "Pending"},
      create: {
        id: id("leave-request", index + 1),
        userId: user.id,
        leaveTypeId: leaveType.id,
        startDate: start,
        endDate: end,
        calendarDays: 2,
        workingDays: money(2),
        reason: "Seed leave request for UI mapping",
        handoverUserId: users[(index + 1) % 15].id,
        handoverNotes: "Please cover urgent requests.",
        attachmentUrl:
          index % 3 === 0 ? `/uploads/demo/leave-${index + 1}.pdf` : null,
        isPaid: index % 5 !== 0,
        status: index % 4 === 0 ? "Approved" : "Pending",
      },
    });
    await prisma.leaveApproval.upsert({
      where: {id: id("leave-approval", index + 1)},
      update: {},
      create: {
        id: id("leave-approval", index + 1),
        leaveRequestId: leave.id,
        reviewerId: admin.id,
        action: leave.status,
        comment: "Seed review comment",
      },
    });
    await prisma.leaveRequestEvent.upsert({
      where: {id: id("leave-event", index + 1)},
      update: {},
      create: {
        id: id("leave-event", index + 1),
        leaveRequestId: leave.id,
        actorId: user.id,
        event: "Submitted",
        note: "Seed workflow event",
      },
    });
    await prisma.holiday.upsert({
      where: {
        companyId_date: {
          companyId: company.id,
          date: date(`2026-10-${String(index + 1).padStart(2, "0")}`),
        },
      },
      update: {},
      create: {
        id: id("holiday", index + 1),
        companyId: company.id,
        name: `Dayflow Holiday ${index + 1}`,
        date: date(`2026-10-${String(index + 1).padStart(2, "0")}`),
        type: index % 2 ? "Optional" : "Public",
      },
    });

    const base = 45000 + index * 2500;
    await prisma.salary.upsert({
      where: {userId_month_year: {userId: user.id, month: 8, year: 2026}},
      update: {},
      create: {
        id: id("salary", index + 1),
        userId: user.id,
        month: 8,
        year: 2026,
        baseSalary: money(base),
        allowances: money(base * 0.2),
        deductions: money(base * 0.1),
        netSalary: money(base * 1.1),
        status: index % 3 === 0 ? "Paid" : "Pending",
      },
    });
    await prisma.salaryStructure.upsert({
      where: {id: id("salary-structure", index + 1)},
      update: {},
      create: {
        id: id("salary-structure", index + 1),
        userId: user.id,
        annualCtc: money(base * 14),
        basePay: money(base),
        hra: money(base * 0.2),
        specialAllowance: money(base * 0.1),
        conveyance: money(2500),
        medical: money(1500),
        effectiveFrom: date("2026-01-01"),
        taxRegime: index % 2 ? "New Regime" : "Old Regime",
      },
    });
    const payroll = await prisma.payrollRecord.upsert({
      where: {userId_month_year: {userId: user.id, month: 8, year: 2026}},
      update: {},
      create: {
        id: id("payroll", index + 1),
        userId: user.id,
        month: 8,
        year: 2026,
        employmentType: "Full-time",
        taxRegime: "New Regime",
        annualCtc: money(base * 14),
        grossPay: money(base * 1.3),
        bonus: money(index * 1000),
        lopDays: money(index % 2),
        lopDeduction: money(index * 100),
        pf: money(base * 0.05),
        tax: money(base * 0.08),
        insurance: money(500),
        loanEmi: money(index * 250),
        netPay: money(base * 1.1),
        status: index % 3 === 0 ? "Paid" : "Processed",
        bankAccountName: `${user.firstName} ${user.lastName}`,
        bankAccountNumber: `DAYFLOW${String(index + 1).padStart(8, "0")}`,
        bankIfsc: "DFBK0001234",
        pan: `DAYF${String(index + 1).padStart(5, "A")}P`,
        disbursementDate: date("2026-08-31"),
      },
    });
    const payslip = await prisma.payslip.upsert({
      where: {payrollRecordId: payroll.id},
      update: {},
      create: {
        id: id("payslip", index + 1),
        payrollRecordId: payroll.id,
        financialYear: "2026-27",
        payPeriod: "August 2026",
        paymentDate: date("2026-08-31"),
        workingDays: money(22),
        lopDays: money(index % 2),
        grossEarnings: money(base * 1.3),
        totalDeductions: money(base * 0.2),
        netPay: money(base * 1.1),
        status: "Paid",
      },
    });
    await prisma.payslipLine.upsert({
      where: {id: id("payslip-line", index + 1)},
      update: {},
      create: {
        id: id("payslip-line", index + 1),
        payslipId: payslip.id,
        name: "Basic Pay",
        category: "Earning",
        amount: money(base),
        annualAmount: money(base * 12),
        taxable: true,
      },
    });
    await prisma.salaryRevision.upsert({
      where: {id: id("salary-revision", index + 1)},
      update: {},
      create: {
        id: id("salary-revision", index + 1),
        userId: user.id,
        approverId: admin.id,
        effectiveDate: date("2026-04-01"),
        revisedGross: money(base * 1.3),
        revisedCtc: money(base * 14),
        changeType: "Annual Revision",
        remarks: "Seed salary revision",
      },
    });
    await prisma.reimbursement.upsert({
      where: {id: id("reimbursement", index + 1)},
      update: {},
      create: {
        id: id("reimbursement", index + 1),
        userId: user.id,
        category: index % 2 ? "Client Travel & Meals" : "Internet",
        amount: money(800 + index * 100),
        receiptUrl: `/uploads/demo/receipt-${index + 1}.pdf`,
        status: index % 3 === 0 ? "Approved" : "Pending",
        includedInPayroll: index % 3 === 0,
        notes: "Seed reimbursement",
      },
    });
    await prisma.loanAdvance.upsert({
      where: {id: id("loan", index + 1)},
      update: {},
      create: {
        id: id("loan", index + 1),
        userId: user.id,
        principal: money(50000 + index * 1000),
        monthlyEmi: money(5000 + index * 100),
        tenureMonths: 12,
        paidMonths: index % 6,
        remainingBalance: money(50000 - index * 1000),
        disbursementDate: date("2026-02-01"),
        reason: "Seed employee advance",
        status: index % 4 === 0 ? "Approved" : "Active",
      },
    });
    const review = await prisma.performanceReview.upsert({
      where: {userId_period: {userId: user.id, period: "Q2 2026"}},
      update: {},
      create: {
        id: id("review", index + 1),
        userId: user.id,
        reviewerId: admin.id,
        period: "Q2 2026",
        status: "Completed",
        overallScore: money(70 + index),
        summary: "Seed quarterly performance review",
        pipCandidate: index === 14,
        completedAt: date("2026-07-15"),
      },
    });
    await prisma.performanceScore.upsert({
      where: {id: id("score", index + 1)},
      update: {},
      create: {
        id: id("score", index + 1),
        reviewId: review.id,
        competency: "Overall Contribution",
        score: money(70 + index),
        comment: "Seed competency score",
      },
    });
    await prisma.helpdeskTicket.upsert({
      where: {id: id("ticket", index + 1)},
      update: {},
      create: {
        id: id("ticket", index + 1),
        companyId: company.id,
        submitterId: user.id,
        assigneeId: index % 2 ? admin.id : null,
        subject: `Demo support request ${index + 1}`,
        description: "Seed ticket for helpdesk UI mapping.",
        department: departments[index],
        category: index % 2 ? "Payroll" : "IT Support",
        priority: index % 3 === 0 ? "High" : "Medium",
        status: index % 3 === 0 ? "Resolved" : "Open",
        resolutionNote: index % 3 === 0 ? "Resolved by HR." : null,
        resolvedAt: index % 3 === 0 ? date("2026-08-20") : null,
        satisfaction: index % 3 === 0 ? 5 : null,
      },
    });
    await prisma.notification.upsert({
      where: {id: id("notification", index + 1)},
      update: {},
      create: {
        id: id("notification", index + 1),
        userId: user.id,
        title: `Dayflow notification ${index + 1}`,
        message: "This is seeded notification data for the employee dashboard.",
        type: index % 2 ? "INFO" : "ACTION",
        readAt: index % 3 === 0 ? date("2026-08-21") : null,
      },
    });
  }

  console.log(
    `Seeded Dayflow demo data for ${company.name}: 15 users and 15 records per domain collection.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
