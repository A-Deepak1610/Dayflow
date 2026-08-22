import prisma from "./lib/prisma";

async function main() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      loginId: true,
      firstName: true,
      lastName: true,
      role: { select: { name: true } },
    },
    take: 25,
  });
  console.log("USERS_LIST:", JSON.stringify(users, null, 2));
}

main().finally(() => prisma.$disconnect());
