import type { PrismaClient } from "@generated/prisma";
import { getUserByIdRepo } from "./repo";
import { AppError } from "types/app";
import { StatusCodes } from "http-status-codes";

export async function getUserByIdOrThrowHelper(prisma: PrismaClient, userId: number) {
  try {
    const user = await getUserByIdRepo(prisma, userId);
    if (!user) throw new AppError(
      1000,
      "",
      "",
      StatusCodes.NOT_FOUND
    );
    return user;
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(1000, "", "", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
