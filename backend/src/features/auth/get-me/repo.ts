import type { PrismaClient } from "@generated/prisma/client";

export async function getUserRoles(
  prisma: PrismaClient,
  userId: string
) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      roles: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!user) return [];

  return user.roles;
}