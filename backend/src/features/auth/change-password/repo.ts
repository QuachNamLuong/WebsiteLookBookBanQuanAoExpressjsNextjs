import type { PrismaClient } from "@generated/prisma/client";
import { StatusCodes } from "http-status-codes";
import { AppError } from "types/app";

export async function getUserByIdRepo(prisma: PrismaClient, userId: number) {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return user;
  } catch (error) {
    throw new AppError(100, "", "", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function updateUserPasswordRepo(prisma: PrismaClient, userId: number, newPasswordHash: string) {
  try {
    await prisma.user.update({ where: { id: userId }, data: { passwordHash: newPasswordHash } });
  } catch (error) {
    throw new AppError(100, "", "", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}