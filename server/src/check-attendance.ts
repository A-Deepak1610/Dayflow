import prisma from "./lib/prisma";

async function main() {
  const companies = await prisma.company.findMany();
  const attendancesCount = await prisma.attendance.count();
  const regsCount = await prisma.attendanceRegularization.count();
  const sampleAtt = await prisma.attendance.findMany({ take: 5, include: { user: true } });
  const sampleRegs = await prisma.attendanceRegularization.findMany({ take: 5, include: { user: true } });
  
  console.log("COMPANIES:", JSON.stringify(companies, null, 2));
  console.log("ATT_COUNT:", attendancesCount, "REGS_COUNT:", regsCount);
  console.log("SAMPLE_ATT:", JSON.stringify(sampleAtt, null, 2));
  console.log("SAMPLE_REGS:", JSON.stringify(sampleRegs, null, 2));
}

main().finally(() => prisma.$disconnect());
