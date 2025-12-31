import type { PrismaClient } from "@generated/prisma/client";
import { StatusCodes } from "http-status-codes";
import { AppError } from "types/app";

export async function getUserByEmailRepo(prisma: PrismaClient, email: string) {
  try {
    const user = prisma.user.findUnique({ where: { email } });
    if (user) return user;

    throw new AppError(
      1000,
      "User lookup failed by email in auth/login feature",
      "Invalid credentials",
      StatusCodes.UNAUTHORIZED
    );
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1000,
      "An unexpected error in getUserByEmail from auth/feature",
      "Unhandle error",
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export async function getUserByUsernameRepo(prisma: PrismaClient, username: string) {
  try {
    const user = prisma.user.findUnique({ where: { username } });
    if (user) return user;

    throw new AppError(
      1000,
      "User lookup failed by username in auth/login feature",
      "Invalid credentials",
      StatusCodes.UNAUTHORIZED
    );

  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1000,
      "An unexpected error in getUserByEmail from auth/feature",
      "Unhandle error",
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}