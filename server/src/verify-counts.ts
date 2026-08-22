import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const counts = {
    companies: await prisma.company.count(),
    roles: await prisma.role.count(),
    departments: await prisma.department.count(),
    jobPositions: await prisma.jobPosition.count(),
    users: await prisma.user.count(),
    employeeProfiles: await prisma.employeeProfile.count(),
    employeeDocuments: await prisma.employeeDocument.count(),
    attendances: await prisma.attendance.count(),
    attendanceRegularizations: await prisma.attendanceRegularization.count(),
    leaveTypes: await prisma.leaveType.count(),
    leaveBalances: await prisma.leaveBalance.count(),
    leaveRequests: await prisma.leaveRequest.count(),
    leaveApprovals: await prisma.leaveApproval.count(),
    leaveRequestEvents: await prisma.leaveRequestEvent.count(),
    holidays: await prisma.holiday.count(),
    salaryStructures: await prisma.salaryStructure.count(),
    salaries: await prisma.salary.count(),
    payrollRecords: await prisma.payrollRecord.count(),
    payslips: await prisma.payslip.count(),
    payslipLines: await prisma.payslipLine.count(),
    salaryRevisions: await prisma.salaryRevision.count(),
    reimbursements: await prisma.reimbursement.count(),
    loanAdvances: await prisma.loanAdvance.count(),
    performanceReviews: await prisma.performanceReview.count(),
    performanceScores: await prisma.performanceScore.count(),
    helpdeskTickets: await prisma.helpdeskTicket.count(),
    notifications: await prisma.notification.count()
  };

  console.log('DATABASE_TABLE_RECORD_COUNTS:', JSON.stringify(counts, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
