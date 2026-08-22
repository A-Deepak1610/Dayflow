import bcrypt from 'bcryptjs';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const money = (val: number) => new Prisma.Decimal(val.toFixed(2));
const date = (val: string) => new Date(`${val}T00:00:00.000Z`);

async function seedAll() {
  console.log('🚀 Starting Comprehensive Dayflow HRMS Mock Data Insertion (Min 15 records per table)...');

  // ==========================================================================
  // 1. COMPANIES (15 Companies)
  // ==========================================================================
  const companyNames = [
    'Dayflow Technologies Inc.',
    'Apex Cloud Solutions',
    'Nexus Digital Systems',
    'Quantum Data Labs',
    'Vanguard Enterprise AI',
    'Starlight Software Corp',
    'Summit Financial Tech',
    'Cascade Global Services',
    'Horizon Biotech Solutions',
    'BlueWave Media Labs',
    'Solaris CleanTech',
    'Zenith Cyber Security',
    'Acrobat Logistics Group',
    'Titan Manufacturing Corp',
    'Pinnacle Health Tech'
  ];

  const companies = [];
  for (let i = 0; i < companyNames.length; i++) {
    const comp = await prisma.company.upsert({
      where: { name: companyNames[i] },
      update: { logoUrl: `/uploads/companies/logo-${i + 1}.png` },
      create: {
        id: `seed-comp-${String(i + 1).padStart(2, '0')}`,
        name: companyNames[i],
        logoUrl: `/uploads/companies/logo-${i + 1}.png`
      }
    });
    companies.push(comp);
  }
  const mainCompany = companies[0];
  console.log(`✓ Companies: ${companies.length}`);

  // ==========================================================================
  // 2. ROLES (15 Roles)
  // ==========================================================================
  const roleNames = [
    'ADMIN',
    'HR',
    'EMPLOYEE',
    'MANAGER',
    'TEAM_LEAD',
    'DIRECTOR',
    'FINANCE_OFFICER',
    'PAYROLL_ADMIN',
    'QA_LEAD',
    'PRODUCT_OWNER',
    'LEGAL_COUNSEL',
    'IT_ADMIN',
    'TALENT_RECRUITER',
    'OPERATIONS_LEAD',
    'RESEARCH_SCIENTIST'
  ];

  const roles = [];
  for (let i = 0; i < roleNames.length; i++) {
    const r = await prisma.role.upsert({
      where: { name: roleNames[i] },
      update: {},
      create: {
        id: `seed-role-${String(i + 1).padStart(2, '0')}`,
        name: roleNames[i]
      }
    });
    roles.push(r);
  }
  const adminRole = roles[0];
  const hrRole = roles[1];
  const employeeRole = roles[2];
  console.log(`✓ Roles: ${roles.length}`);

  // ==========================================================================
  // 3. DEPARTMENTS (15 Departments)
  // ==========================================================================
  const deptNames = [
    'Engineering',
    'Product Management',
    'Design & User Experience',
    'Finance & Accounts',
    'Human Resources',
    'Sales & Business Dev',
    'Brand & Growth Marketing',
    'Cloud Operations & Infra',
    'Customer Success',
    'Legal & Compliance',
    'Information Technology',
    'Procurement & Supply',
    'Quality Assurance',
    'General Administration',
    'R&D Advanced Labs'
  ];

  const departments = [];
  for (let i = 0; i < deptNames.length; i++) {
    const dept = await prisma.department.upsert({
      where: { companyId_name: { companyId: mainCompany.id, name: deptNames[i] } },
      update: { description: `${deptNames[i]} division at ${mainCompany.name}` },
      create: {
        id: `seed-dept-${String(i + 1).padStart(2, '0')}`,
        companyId: mainCompany.id,
        name: deptNames[i],
        description: `${deptNames[i]} division at ${mainCompany.name}`
      }
    });
    departments.push(dept);
  }
  console.log(`✓ Departments: ${departments.length}`);

  // ==========================================================================
  // 4. JOB POSITIONS (15 Positions)
  // ==========================================================================
  const posTitles = [
    'Senior Fullstack Engineer',
    'Lead Product Manager',
    'Principal UI/UX Designer',
    'Senior Financial Analyst',
    'HR Operations Specialist',
    'Enterprise Sales Executive',
    'Growth Marketing Manager',
    'DevOps & Cloud Architect',
    'Customer Success Director',
    'Corporate Legal Counsel',
    'Senior IT Administrator',
    'Global Procurement Lead',
    'QA Automation Architect',
    'Facilities & Office Manager',
    'Chief AI Research Scientist'
  ];

  const jobPositions = [];
  for (let i = 0; i < posTitles.length; i++) {
    const pos = await prisma.jobPosition.upsert({
      where: { companyId_title: { companyId: mainCompany.id, title: posTitles[i] } },
      update: { departmentId: departments[i].id },
      create: {
        id: `seed-pos-${String(i + 1).padStart(2, '0')}`,
        companyId: mainCompany.id,
        departmentId: departments[i].id,
        title: posTitles[i],
        description: `Strategic responsibility for ${posTitles[i]}`
      }
    });
    jobPositions.push(pos);
  }
  console.log(`✓ Job Positions: ${jobPositions.length}`);

  // ==========================================================================
  // 5. USERS (20 Users)
  // ==========================================================================
  const firstNames = [
    'Alex', 'Sarah', 'Sophia', 'Liam', 'Marcus', 'Elena', 'Vikram', 'Ananya', 'Arun', 'Priya',
    'Rahul', 'Karthik', 'Divya', 'David', 'Rachel', 'Jessica', 'Neil', 'Tara', 'Karan', 'Sara'
  ];
  const lastNames = [
    'Johnson', 'Williams', 'Chen', 'Patel', 'Vance', 'Rostova', 'Sethi', 'Mukherjee', 'Kumar', 'Sharma',
    'Raj', 'Subramanian', 'Reddy', 'Miller', 'Green', 'Alba', 'Bose', 'Das', 'Verma', 'Gupta'
  ];

  const passwordHash = await bcrypt.hash('Dayflow@123', 10);
  const users = [];

  for (let i = 0; i < 20; i++) {
    const uId = `seed-user-${String(i + 1).padStart(2, '0')}`;
    const user = await prisma.user.upsert({
      where: { id: uId },
      update: {
        firstName: firstNames[i],
        lastName: lastNames[i],
        departmentId: departments[i % departments.length].id,
        positionId: jobPositions[i % jobPositions.length].id
      },
      create: {
        id: uId,
        companyId: mainCompany.id,
        firstName: firstNames[i],
        lastName: lastNames[i],
        phone: `+91 98765 ${String(10000 + i * 111).slice(0, 5)}`,
        loginId: `EMP${String(1000 + i + 1)}`,
        email: `${firstNames[i].toLowerCase()}.${lastNames[i].toLowerCase()}@dayflow.io`,
        password: passwordHash,
        isFirstLogin: false,
        roleId: i === 0 ? adminRole.id : i === 1 ? hrRole.id : employeeRole.id,
        departmentId: departments[i % departments.length].id,
        positionId: jobPositions[i % jobPositions.length].id
      }
    });
    users.push(user);
  }
  const adminUser = users[0];
  const hrUser = users[1];
  console.log(`✓ Users: ${users.length}`);

  // Assign Manager relationships
  for (let i = 2; i < users.length; i++) {
    await prisma.user.update({
      where: { id: users[i].id },
      data: { managerId: i % 2 === 0 ? adminUser.id : hrUser.id }
    });
  }

  // ==========================================================================
  // 6. REFRESH TOKENS (15 Tokens)
  // ==========================================================================
  for (let i = 0; i < 15; i++) {
    await prisma.refreshToken.upsert({
      where: { id: `seed-token-${String(i + 1).padStart(2, '0')}` },
      update: {},
      create: {
        id: `seed-token-${String(i + 1).padStart(2, '0')}`,
        token: `seed_jwt_refresh_token_string_hash_${i + 1}_${Date.now()}`,
        userId: users[i].id,
        expiresAt: new Date(Date.now() + 30 * 24 * 3600 * 1000),
        revoked: false
      }
    });
  }
  console.log('✓ Refresh Tokens: 15');

  // ==========================================================================
  // 7. EMPLOYEE PROFILES (20 Profiles)
  // ==========================================================================
  for (let i = 0; i < users.length; i++) {
    const u = users[i];
    await prisma.employeeProfile.upsert({
      where: { userId: u.id },
      update: {
        location: `Building ${String.fromCharCode(65 + (i % 3))}, Floor ${(i % 4) + 1} (Desk ${(i % 4) + 1}${String.fromCharCode(65 + (i % 3))}-${String(i + 1).padStart(2, '0')})`,
        employmentType: 'Full-time Permanent'
      },
      create: {
        id: `seed-profile-${String(i + 1).padStart(2, '0')}`,
        userId: u.id,
        about: `${u.firstName} ${u.lastName} is an accomplished professional contributing to Dayflow's global HRMS delivery.`,
        jobInterests: 'Enterprise SaaS architecture, team mentoring, automated testing, high scale systems',
        hobbies: 'Chess, distance running, classical music, hiking',
        skills: ['React.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Cloud Infrastructure', 'Team Leadership'],
        certifications: ['AWS Certified Solutions Architect', 'Professional Scrum Master PSM-II', 'Dayflow Excellence Badge'],
        dateOfBirth: date(`199${i % 8 + 1}-0${(i % 8) + 1}-15`),
        address: `Flat ${101 + i * 10}, Greenfield Residency, Tower ${String.fromCharCode(65 + (i % 4))}, Baner Road, Pune, MH 411045`,
        nationality: 'Indian',
        gender: i % 2 === 0 ? 'Female' : 'Male',
        maritalStatus: i % 3 === 0 ? 'Married' : 'Single',
        personalEmail: `${u.firstName.toLowerCase()}.${u.lastName.toLowerCase()}.personal@gmail.com`,
        location: `Building ${String.fromCharCode(65 + (i % 3))}, Floor ${(i % 4) + 1} (Desk ${(i % 4) + 1}${String.fromCharCode(65 + (i % 3))}-${String(i + 1).padStart(2, '0')})`,
        employmentType: 'Full-time Permanent',
        joiningDate: date(`202${i % 4 + 1}-0${(i % 8) + 1}-10`),
        bankAccountName: `${u.firstName} ${u.lastName}`,
        bankAccountNumber: `50100234${String(8800 + i * 11)}`,
        bankIfsc: 'HDFC0001234',
        pan: `DAYF${String(1000 + i)}P`,
        uan: `100928374${String(600 + i)}`,
        pfNumber: `MH/BAN/0045231/000/${String(1000 + i)}`,
        avatarUrl: `/uploads/avatars/user-${i + 1}.png`
      }
    });
  }
  console.log('✓ Employee Profiles: 20');

  // ==========================================================================
  // 8. EMPLOYEE DOCUMENTS (25 Documents)
  // ==========================================================================
  const docCategories = ['Offer Letter', 'National ID (Aadhaar/PAN)', 'Degree Certificate', 'Form 16 Tax Statement', 'Relieving Letter'];
  for (let i = 0; i < 25; i++) {
    const user = users[i % users.length];
    const cat = docCategories[i % docCategories.length];
    await prisma.employeeDocument.upsert({
      where: { id: `seed-doc-${String(i + 1).padStart(2, '0')}` },
      update: {},
      create: {
        id: `seed-doc-${String(i + 1).padStart(2, '0')}`,
        userId: user.id,
        name: `${user.firstName}_${cat.replace(/[^a-zA-Z0-9]/g, '_')}_Verified.pdf`,
        category: cat,
        fileUrl: `/uploads/documents/${user.id}_doc_${i + 1}.pdf`
      }
    });
  }
  console.log('✓ Employee Documents: 25');

  // ==========================================================================
  // 9. ATTENDANCE (60 Attendance Logs across August 2026)
  // ==========================================================================
  for (let i = 0; i < 60; i++) {
    const user = users[i % users.length];
    const day = (i % 20) + 1;
    const attDate = date(`2026-08-${String(day).padStart(2, '0')}`);
    const isLate = i % 7 === 0;
    const isHalfDay = i % 11 === 0;
    const clockInH = isLate ? 9 : 8;
    const clockInM = isLate ? 25 : 55 + (i % 5);

    await prisma.attendance.upsert({
      where: { userId_date: { userId: user.id, date: attDate } },
      update: {
        status: isHalfDay ? 'Half-day' : isLate ? 'Late' : 'Present',
        totalMinutes: isHalfDay ? 240 : 540 + (i % 4) * 15
      },
      create: {
        id: `seed-att-${String(i + 1).padStart(2, '0')}`,
        userId: user.id,
        date: attDate,
        clockIn: new Date(`2026-08-${String(day).padStart(2, '0')}T0${clockInH}:${String(clockInM).padStart(2, '0')}:00.000Z`),
        clockOut: new Date(`2026-08-${String(day).padStart(2, '0')}T${isHalfDay ? '13:30' : '18:05'}:00.000Z`),
        shift: 'General (09:00 AM - 06:00 PM)',
        workMode: i % 3 === 0 ? 'Remote WFH' : 'Office - Desk 4B',
        breakMinutes: isHalfDay ? 30 : 45,
        totalMinutes: isHalfDay ? 240 : 540 + (i % 4) * 15,
        overtimeMinutes: isHalfDay || isLate ? 0 : (i % 3) * 20,
        status: isHalfDay ? 'Half-day' : isLate ? 'Late' : 'Present',
        notes: isLate ? 'Traffic congestion on highway' : 'Standard biometric verification'
      }
    });
  }
  console.log('✓ Attendance Records: 60');

  // ==========================================================================
  // 10. ATTENDANCE REGULARIZATIONS (20 Regularizations)
  // ==========================================================================
  for (let i = 0; i < 20; i++) {
    const user = users[i % users.length];
    const regDate = date(`2026-08-${String((i % 20) + 1).padStart(2, '0')}`);
    const isApproved = i % 2 === 0;
    await prisma.attendanceRegularization.upsert({
      where: { id: `seed-reg-${String(i + 1).padStart(2, '0')}` },
      update: { status: isApproved ? 'Approved' : 'Pending' },
      create: {
        id: `seed-reg-${String(i + 1).padStart(2, '0')}`,
        userId: user.id,
        reviewerId: hrUser.id,
        date: regDate,
        originalClockIn: new Date(`2026-08-${String((i % 20) + 1).padStart(2, '0')}T09:25:00.000Z`),
        originalClockOut: new Date(`2026-08-${String((i % 20) + 1).padStart(2, '0')}T18:00:00.000Z`),
        requestedClockIn: new Date(`2026-08-${String((i % 20) + 1).padStart(2, '0')}T09:00:00.000Z`),
        requestedClockOut: new Date(`2026-08-${String((i % 20) + 1).padStart(2, '0')}T18:00:00.000Z`),
        reason: i % 2 === 0 ? 'Biometric gate scanner server restart' : 'Client breakfast meeting offsite',
        status: isApproved ? 'Approved' : 'Pending',
        reviewNote: isApproved ? 'Approved by HR Lead with supervisor concurrence.' : null,
        submittedAt: new Date(Date.now() - (20 - i) * 3600 * 1000 * 12),
        reviewedAt: isApproved ? new Date() : null
      }
    });
  }
  console.log('✓ Attendance Regularizations: 20');

  // ==========================================================================
  // 11. LEAVE TYPES (15 Leave Types)
  // ==========================================================================
  const leaveConfigs = [
    { name: 'Annual Leave', quota: 20, notice: 3, max: 10, carry: true, doc: false },
    { name: 'Sick Leave', quota: 8, notice: 0, max: 10, carry: false, doc: true },
    { name: 'Casual Leave', quota: 7, notice: 1, max: 3, carry: false, doc: false },
    { name: 'Compensatory Off', quota: 3, notice: 2, max: 2, carry: false, doc: false },
    { name: 'Maternity Leave', quota: 182, notice: 30, max: 182, carry: false, doc: true },
    { name: 'Paternity Leave', quota: 10, notice: 14, max: 10, carry: false, doc: true },
    { name: 'Bereavement Leave', quota: 5, notice: 0, max: 5, carry: false, doc: false },
    { name: 'Marriage Leave', quota: 5, notice: 15, max: 5, carry: false, doc: true },
    { name: 'Study & Exam Leave', quota: 10, notice: 14, max: 10, carry: false, doc: true },
    { name: 'Unpaid Leave (Loss of Pay)', quota: 30, notice: 7, max: 30, carry: false, doc: false },
    { name: 'Sabbatical Leave', quota: 90, notice: 60, max: 90, carry: false, doc: true },
    { name: 'Relocation Leave', quota: 3, notice: 14, max: 3, carry: false, doc: false },
    { name: 'Volunteer Leave', quota: 2, notice: 7, max: 2, carry: false, doc: false },
    { name: 'Emergency Family Care', quota: 5, notice: 0, max: 5, carry: false, doc: false },
    { name: 'Wellness Day Off', quota: 4, notice: 3, max: 1, carry: false, doc: false }
  ];

  const leaveTypes = [];
  for (let i = 0; i < leaveConfigs.length; i++) {
    const lt = await prisma.leaveType.upsert({
      where: { companyId_name: { companyId: mainCompany.id, name: leaveConfigs[i].name } },
      update: {},
      create: {
        id: `seed-lt-${String(i + 1).padStart(2, '0')}`,
        companyId: mainCompany.id,
        name: leaveConfigs[i].name,
        quota: money(leaveConfigs[i].quota),
        purpose: `Dayflow statutory policy for ${leaveConfigs[i].name}`,
        noticePeriodDays: leaveConfigs[i].notice,
        maxContinuousDays: leaveConfigs[i].max,
        carryForward: leaveConfigs[i].carry,
        documentationRequired: leaveConfigs[i].doc,
        approvalWorkflow: 'Direct Team Lead → HR Operations'
      }
    });
    leaveTypes.push(lt);
  }
  console.log(`✓ Leave Types: ${leaveTypes.length}`);

  // ==========================================================================
  // 12. LEAVE BALANCES (30 Balances for 2026)
  // ==========================================================================
  for (let i = 0; i < 30; i++) {
    const user = users[i % users.length];
    const lt = leaveTypes[i % 4]; // Core leaves
    await prisma.leaveBalance.upsert({
      where: { userId_leaveTypeId_year: { userId: user.id, leaveTypeId: lt.id, year: 2026 } },
      update: {},
      create: {
        id: `seed-lbal-${String(i + 1).padStart(2, '0')}`,
        userId: user.id,
        leaveTypeId: lt.id,
        year: 2026,
        totalDays: money(Number(lt.quota)),
        usedDays: money(i % 5),
        pendingDays: money(i % 3 === 0 ? 1 : 0),
        adjustedDays: money(0)
      }
    });
  }
  console.log('✓ Leave Balances: 30');

  // ==========================================================================
  // 13. LEAVE REQUESTS (20 Requests)
  // ==========================================================================
  const leaveRequests = [];
  for (let i = 0; i < 20; i++) {
    const user = users[i % users.length];
    const lt = leaveTypes[i % 4];
    const startDay = (i % 20) + 5;
    const sDate = date(`2026-09-${String(startDay).padStart(2, '0')}`);
    const eDate = date(`2026-09-${String(startDay + (i % 3)).padStart(2, '0')}`);
    const status = i % 3 === 0 ? 'Approved' : i % 4 === 0 ? 'Rejected' : 'Pending';

    const req = await prisma.leaveRequest.upsert({
      where: { id: `seed-lreq-${String(i + 1).padStart(2, '0')}` },
      update: { status },
      create: {
        id: `seed-lreq-${String(i + 1).padStart(2, '0')}`,
        userId: user.id,
        leaveTypeId: lt.id,
        startDate: sDate,
        endDate: eDate,
        calendarDays: (i % 3) + 1,
        workingDays: money((i % 3) + 1),
        weekendDays: 0,
        holidayDays: 0,
        reason: i % 2 === 0 ? 'Personal vacation and travel' : 'Family medical appointment',
        handoverUserId: users[(i + 1) % users.length].id,
        handoverNotes: 'Covering active sprint tickets and customer escalation queue.',
        attachmentUrl: lt.documentationRequired ? `/uploads/leave-attachments/doc_${i + 1}.pdf` : null,
        isPaid: true,
        status,
        appliedAt: new Date(Date.now() - (20 - i) * 24 * 3600 * 1000),
        approvedAt: status === 'Approved' ? new Date() : null,
        rejectedAt: status === 'Rejected' ? new Date() : null,
        reviewerComment: status === 'Approved' ? 'Approved as per leave policy.' : status === 'Rejected' ? 'Team capacity is limited during this cycle.' : null
      }
    });
    leaveRequests.push(req);
  }
  console.log(`✓ Leave Requests: ${leaveRequests.length}`);

  // ==========================================================================
  // 14. LEAVE APPROVALS (20 Approvals)
  // ==========================================================================
  for (let i = 0; i < 20; i++) {
    const lReq = leaveRequests[i];
    await prisma.leaveApproval.upsert({
      where: { id: `seed-lapp-${String(i + 1).padStart(2, '0')}` },
      update: {},
      create: {
        id: `seed-lapp-${String(i + 1).padStart(2, '0')}`,
        leaveRequestId: lReq.id,
        reviewerId: hrUser.id,
        action: lReq.status,
        comment: lReq.status === 'Approved' ? 'Leave sanctioned under annual quota.' : 'Requires rescheduling.'
      }
    });
  }
  console.log('✓ Leave Approvals: 20');

  // ==========================================================================
  // 15. LEAVE REQUEST EVENTS (20 Events)
  // ==========================================================================
  for (let i = 0; i < 20; i++) {
    const lReq = leaveRequests[i];
    await prisma.leaveRequestEvent.upsert({
      where: { id: `seed-levent-${String(i + 1).padStart(2, '0')}` },
      update: {},
      create: {
        id: `seed-levent-${String(i + 1).padStart(2, '0')}`,
        leaveRequestId: lReq.id,
        actorId: lReq.userId,
        event: 'Application Submitted',
        note: 'Submitted via Dayflow Employee Self-Service portal.'
      }
    });
  }
  console.log('✓ Leave Request Events: 20');

  // ==========================================================================
  // 16. HOLIDAYS (15 Official 2026 Holidays)
  // ==========================================================================
  const officialHolidays = [
    { name: "New Year's Day", date: '2026-01-01', type: 'Public' },
    { name: 'Republic Day', date: '2026-01-26', type: 'National' },
    { name: 'Holi Festival', date: '2026-03-04', type: 'Public' },
    { name: 'Good Friday', date: '2026-04-03', type: 'Public' },
    { name: 'Labor Day', date: '2026-05-01', type: 'Public' },
    { name: 'Eid al-Adha Observance', date: '2026-05-27', type: 'Public' },
    { name: 'Independence Day', date: '2026-08-15', type: 'National' },
    { name: 'Janmashtami Festival', date: '2026-08-26', type: 'Public' },
    { name: 'National Day Observance', date: '2026-08-31', type: 'Public' },
    { name: 'Gandhi Jayanti', date: '2026-10-02', type: 'National' },
    { name: 'Dussehra Festival', date: '2026-10-20', type: 'Public' },
    { name: 'Diwali Festival', date: '2026-11-08', type: 'Public' },
    { name: 'Guru Nanak Jayanti', date: '2026-11-24', type: 'Public' },
    { name: 'Christmas Day', date: '2026-12-25', type: 'Public' },
    { name: 'New Year Eve Observance', date: '2026-12-31', type: 'Optional' }
  ];

  for (let i = 0; i < officialHolidays.length; i++) {
    await prisma.holiday.upsert({
      where: { companyId_date: { companyId: mainCompany.id, date: date(officialHolidays[i].date) } },
      update: {},
      create: {
        id: `seed-hol-${String(i + 1).padStart(2, '0')}`,
        companyId: mainCompany.id,
        name: officialHolidays[i].name,
        date: date(officialHolidays[i].date),
        type: officialHolidays[i].type,
        status: 'Active'
      }
    });
  }
  console.log('✓ Company Holidays: 15');

  // ==========================================================================
  // 17. SALARY STRUCTURES (20 Salary Structures)
  // ==========================================================================
  for (let i = 0; i < users.length; i++) {
    const base = 40000 + (i * 3000);
    const hra = base * 0.5;
    const special = base * 0.3;
    const conv = 4500;
    const med = 3000;
    const ctc = (base + hra + special + conv + med) * 12;

    await prisma.salaryStructure.upsert({
      where: { id: `seed-sstr-${String(i + 1).padStart(2, '0')}` },
      update: {},
      create: {
        id: `seed-sstr-${String(i + 1).padStart(2, '0')}`,
        userId: users[i].id,
        annualCtc: money(ctc),
        basePay: money(base),
        hra: money(hra),
        specialAllowance: money(special),
        conveyance: money(conv),
        medical: money(med),
        effectiveFrom: date('2026-01-01'),
        taxRegime: i % 2 === 0 ? 'New Regime (Section 115BAC)' : 'Old Regime'
      }
    });
  }
  console.log('✓ Salary Structures: 20');

  // ==========================================================================
  // 18. SALARIES (20 Salaries for August 2026)
  // ==========================================================================
  for (let i = 0; i < users.length; i++) {
    const base = 40000 + (i * 3000);
    const allowances = base * 0.8 + 7500;
    const deductions = base * 0.12 + 4000;
    const net = (base + allowances) - deductions;

    await prisma.salary.upsert({
      where: { userId_month_year: { userId: users[i].id, month: 8, year: 2026 } },
      update: {},
      create: {
        id: `seed-sal-${String(i + 1).padStart(2, '0')}`,
        userId: users[i].id,
        month: 8,
        year: 2026,
        baseSalary: money(base),
        allowances: money(allowances),
        deductions: money(deductions),
        netSalary: money(net),
        status: 'Paid'
      }
    });
  }
  console.log('✓ Salaries: 20');

  // ==========================================================================
  // 19. PAYROLL RECORDS (20 Payroll Records)
  // ==========================================================================
  const payrollRecords = [];
  for (let i = 0; i < users.length; i++) {
    const u = users[i];
    const base = 40000 + (i * 3000);
    const gross = base + (base * 0.8) + 7500;
    const pf = base * 0.12;
    const tax = 3800 + (i * 200);
    const insurance = 1000;
    const totalDed = pf + tax + insurance + 200; // PT 200
    const net = gross - totalDed;

    const pr = await prisma.payrollRecord.upsert({
      where: { userId_month_year: { userId: u.id, month: 8, year: 2026 } },
      update: {},
      create: {
        id: `seed-pr-${String(i + 1).padStart(2, '0')}`,
        userId: u.id,
        month: 8,
        year: 2026,
        employmentType: 'Full-time Permanent',
        taxRegime: 'New Regime (Section 115BAC)',
        annualCtc: money(gross * 12),
        grossPay: money(gross),
        bonus: money(i % 3 === 0 ? 5000 : 0),
        lopDays: money(0),
        lopDeduction: money(0),
        pf: money(pf),
        tax: money(tax),
        insurance: money(insurance),
        loanEmi: money(0),
        netPay: money(net),
        status: 'Processed',
        bankAccountName: `${u.firstName} ${u.lastName}`,
        bankAccountNumber: `50100234${String(8800 + i * 11)}`,
        bankIfsc: 'HDFC0001234',
        pan: `DAYF${String(1000 + i)}P`,
        disbursementDate: date('2026-08-31')
      }
    });
    payrollRecords.push(pr);
  }
  console.log(`✓ Payroll Records: ${payrollRecords.length}`);

  // ==========================================================================
  // 20. PAYSLIPS & 21. PAYSLIP LINES (20 Payslips & 40+ Lines)
  // ==========================================================================
  for (let i = 0; i < payrollRecords.length; i++) {
    const pr = payrollRecords[i];
    const ps = await prisma.payslip.upsert({
      where: { payrollRecordId: pr.id },
      update: {},
      create: {
        id: `seed-ps-${String(i + 1).padStart(2, '0')}`,
        payrollRecordId: pr.id,
        financialYear: '2026–27',
        payPeriod: 'August 2026',
        paymentDate: date('2026-08-31'),
        workingDays: money(22),
        lopDays: money(0),
        grossEarnings: pr.grossPay,
        totalDeductions: money(Number(pr.grossPay) - Number(pr.netPay)),
        netPay: pr.netPay,
        status: 'Processed'
      }
    });

    // Payslip Lines (Earning & Deduction)
    await prisma.payslipLine.upsert({
      where: { id: `seed-psl-earn-${String(i + 1).padStart(2, '0')}` },
      update: {},
      create: {
        id: `seed-psl-earn-${String(i + 1).padStart(2, '0')}`,
        payslipId: ps.id,
        name: 'Basic Salary',
        category: 'Earnings',
        amount: money(40000 + i * 3000),
        annualAmount: money((40000 + i * 3000) * 12),
        taxable: true
      }
    });

    await prisma.payslipLine.upsert({
      where: { id: `seed-psl-ded-${String(i + 1).padStart(2, '0')}` },
      update: {},
      create: {
        id: `seed-psl-ded-${String(i + 1).padStart(2, '0')}`,
        payslipId: ps.id,
        name: 'Employee Provident Fund (EPF)',
        category: 'Deductions',
        amount: money((40000 + i * 3000) * 0.12),
        annualAmount: money((40000 + i * 3000) * 0.12 * 12),
        taxable: false
      }
    });
  }
  console.log('✓ Payslips: 20 & Payslip Lines: 40');

  // ==========================================================================
  // 22. SALARY REVISIONS (20 Revisions)
  // ==========================================================================
  for (let i = 0; i < users.length; i++) {
    const base = 40000 + (i * 3000);
    await prisma.salaryRevision.upsert({
      where: { id: `seed-srev-${String(i + 1).padStart(2, '0')}` },
      update: {},
      create: {
        id: `seed-srev-${String(i + 1).padStart(2, '0')}`,
        userId: users[i].id,
        approverId: adminUser.id,
        effectiveDate: date('2026-04-01'),
        revisedGross: money(base * 1.3),
        revisedCtc: money(base * 14),
        changeType: i % 2 === 0 ? 'Annual Appraisal' : 'Band Promotion L4',
        remarks: 'Performance rating: Exceeds Expectations (Q1 Cycle).'
      }
    });
  }
  console.log('✓ Salary Revisions: 20');

  // ==========================================================================
  // 23. REIMBURSEMENTS (20 Reimbursements)
  // ==========================================================================
  const reimbCats = ['Broadband & Remote Work', 'Client Travel & Meals', 'Technical Certifications', 'Office Ergonomics', 'Medical Health Checkup'];
  for (let i = 0; i < 20; i++) {
    const user = users[i % users.length];
    await prisma.reimbursement.upsert({
      where: { id: `seed-reimb-${String(i + 1).padStart(2, '0')}` },
      update: {},
      create: {
        id: `seed-reimb-${String(i + 1).padStart(2, '0')}`,
        userId: user.id,
        category: reimbCats[i % reimbCats.length],
        amount: money(1200 + i * 250),
        receiptUrl: `/uploads/reimbursements/receipt_${i + 1}.pdf`,
        status: i % 3 === 0 ? 'Approved' : 'Pending',
        includedInPayroll: i % 3 === 0,
        notes: 'Official expense incurred on behalf of Dayflow business operations.',
        reviewedAt: i % 3 === 0 ? new Date() : null
      }
    });
  }
  console.log('✓ Reimbursements: 20');

  // ==========================================================================
  // 24. LOAN ADVANCES (20 Loan Advances)
  // ==========================================================================
  for (let i = 0; i < 20; i++) {
    const user = users[i % users.length];
    await prisma.loanAdvance.upsert({
      where: { id: `seed-loan-${String(i + 1).padStart(2, '0')}` },
      update: {},
      create: {
        id: `seed-loan-${String(i + 1).padStart(2, '0')}`,
        userId: user.id,
        principal: money(60000 + i * 5000),
        monthlyEmi: money(5000 + i * 250),
        tenureMonths: 12,
        paidMonths: i % 6,
        remainingBalance: money(60000 - (i % 6) * 5000),
        disbursementDate: date('2026-03-01'),
        reason: 'Interest-free company emergency relocation advance',
        status: 'Active'
      }
    });
  }
  console.log('✓ Loan Advances: 20');

  // ==========================================================================
  // 25. PERFORMANCE REVIEWS & 26. SCORES (20 Reviews & 20+ Scores)
  // ==========================================================================
  for (let i = 0; i < users.length; i++) {
    const u = users[i];
    const rev = await prisma.performanceReview.upsert({
      where: { userId_period: { userId: u.id, period: 'FY 2026 Q2' } },
      update: {},
      create: {
        id: `seed-prev-${String(i + 1).padStart(2, '0')}`,
        userId: u.id,
        reviewerId: adminUser.id,
        period: 'FY 2026 Q2',
        status: 'Completed',
        overallScore: money(4.2 + (i % 6) * 0.1),
        summary: `${u.firstName} demonstrated high technical competency, excellent cross-team communication, and timely sprint deliverable execution.`,
        pipCandidate: false,
        completedAt: date('2026-07-15')
      }
    });

    await prisma.performanceScore.upsert({
      where: { reviewId_competency: { reviewId: rev.id, competency: 'Engineering & Code Excellence' } },
      update: {},
      create: {
        id: `seed-pscore-${String(i + 1).padStart(2, '0')}`,
        reviewId: rev.id,
        competency: 'Engineering & Code Excellence',
        score: money(4.5),
        comment: 'High code quality, comprehensive unit tests, and minimal production bugs.'
      }
    });
  }
  console.log('✓ Performance Reviews & Scores: 20 each');

  // ==========================================================================
  // 27. HELPDESK TICKETS (20 Tickets)
  // ==========================================================================
  const ticketCategories = ['Payroll Inquiry', 'IT Hardware & VPN', 'HR Policy & Benefits', 'Workplace & Access Card', 'Software License'];
  for (let i = 0; i < 20; i++) {
    const user = users[i % users.length];
    const isResolved = i % 3 === 0;
    await prisma.helpdeskTicket.upsert({
      where: { id: `seed-tkt-${String(i + 1).padStart(2, '0')}` },
      update: {},
      create: {
        id: `seed-tkt-${String(i + 1).padStart(2, '0')}`,
        companyId: mainCompany.id,
        submitterId: user.id,
        assigneeId: hrUser.id,
        subject: `Assistance with ${ticketCategories[i % ticketCategories.length]} - #${1000 + i}`,
        description: `Employee ${user.firstName} submitted an official helpdesk inquiry regarding ${ticketCategories[i % ticketCategories.length]}.`,
        department: departments[i % departments.length].name,
        category: ticketCategories[i % ticketCategories.length],
        priority: i % 4 === 0 ? 'High' : 'Medium',
        status: isResolved ? 'Resolved' : 'In Progress',
        resolutionNote: isResolved ? 'Ticket resolved by People Operations team.' : null,
        resolvedAt: isResolved ? new Date() : null,
        satisfaction: isResolved ? 5 : null
      }
    });
  }
  console.log('✓ Helpdesk Tickets: 20');

  // ==========================================================================
  // 28. NOTIFICATIONS (25 Notifications)
  // ==========================================================================
  for (let i = 0; i < 25; i++) {
    const user = users[i % users.length];
    await prisma.notification.upsert({
      where: { id: `seed-notif-${String(i + 1).padStart(2, '0')}` },
      update: {},
      create: {
        id: `seed-notif-${String(i + 1).padStart(2, '0')}`,
        userId: user.id,
        title: i % 3 === 0 ? 'Leave Request Approved ✓' : i % 2 === 0 ? 'August 2026 Payslip Available' : 'Attendance Check-in Verified',
        message: i % 3 === 0 ? 'Your annual leave request has been approved by management.' : 'Your monthly salary statement has been processed and is ready for download.',
        type: i % 3 === 0 ? 'SUCCESS' : 'INFO',
        readAt: i % 2 === 0 ? new Date() : null
      }
    });
  }
  console.log('✓ Notifications: 25');

  console.log('\n🎉 ALL 27 DATABASE TABLES SUCCESSFULLY POPULATED WITH AT LEAST 15–60 RECORDS EACH!');
}

seedAll()
  .catch((e) => {
    console.error('❌ Error during comprehensive seed:', e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
