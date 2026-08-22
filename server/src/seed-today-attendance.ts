import prisma from "./lib/prisma";

async function main() {
  const today = new Date("2026-08-22T00:00:00.000Z");
  const users = await prisma.user.findMany({
    include: { department: true, position: true }
  });

  console.log(`Found ${users.length} users. Creating attendance records for 2026-08-22...`);

  const statuses = ["Present", "Present", "Present", "Late", "Present", "Half-day", "Present", "Present"];
  const shifts = [
    "General (09:00 - 18:00)",
    "Morning (08:00 - 17:00)",
    "Evening (13:00 - 22:00)",
    "General (09:00 - 18:00)"
  ];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const status = statuses[i % statuses.length];
    const shift = shifts[i % shifts.length];

    const inHour = status === "Late" ? 9 : 8;
    const inMin = status === "Late" ? 45 : (45 + (i % 12));
    const outHour = status === "Half-day" ? 13 : 18;
    const outMin = status === "Half-day" ? 30 : (5 + (i % 20));

    const clockIn = new Date(`2026-08-22T0${inHour}:${String(inMin).padStart(2, '0')}:00.000Z`);
    const clockOut = new Date(`2026-08-22T${outHour}:${String(outMin).padStart(2, '0')}:00.000Z`);
    const totalMinutes = status === "Half-day" ? 270 : 540;

    await prisma.attendance.upsert({
      where: {
        userId_date: {
          userId: user.id,
          date: today,
        },
      },
      update: {
        clockIn,
        clockOut,
        shift,
        workMode: i % 3 === 0 ? "Remote" : "Office",
        breakMinutes: 45,
        totalMinutes,
        overtimeMinutes: i % 4 === 0 ? 30 : 0,
        status,
        notes: status === "Late" ? "Reported morning transit delay" : "Biometric punch verified",
      },
      create: {
        userId: user.id,
        date: today,
        clockIn,
        clockOut,
        shift,
        workMode: i % 3 === 0 ? "Remote" : "Office",
        breakMinutes: 45,
        totalMinutes,
        overtimeMinutes: i % 4 === 0 ? 30 : 0,
        status,
        notes: status === "Late" ? "Reported morning transit delay" : "Biometric punch verified",
      },
    });
  }

  // Also ensure pending regularizations exist
  const pendingUsers = users.slice(1, 6);
  for (let i = 0; i < pendingUsers.length; i++) {
    const pu = pendingUsers[i];
    await prisma.attendanceRegularization.upsert({
      where: { id: `reg-live-${pu.id}` },
      update: {},
      create: {
        id: `reg-live-${pu.id}`,
        userId: pu.id,
        date: new Date(`2026-08-${String(18 + i).padStart(2, '0')}T00:00:00.000Z`),
        originalClockIn: new Date(`2026-08-${String(18 + i).padStart(2, '0')}T09:45:00.000Z`),
        originalClockOut: new Date(`2026-08-${String(18 + i).padStart(2, '0')}T18:00:00.000Z`),
        requestedClockIn: new Date(`2026-08-${String(18 + i).padStart(2, '0')}T09:00:00.000Z`),
        requestedClockOut: new Date(`2026-08-${String(18 + i).padStart(2, '0')}T18:00:00.000Z`),
        reason: i % 2 === 0 ? "Biometric reader error at reception" : "Attending external client kick-off meeting",
        status: "Pending",
      }
    });
  }

  console.log("Successfully seeded today attendance and regularization queue!");
}

main().finally(() => prisma.$disconnect());
