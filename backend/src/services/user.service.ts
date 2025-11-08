import { StatusCodes } from "http-status-codes";
import type { Role } from "../generated/prisma/index";
import prisma from "../lib/prisma";
import { AppError } from "../types/app.d";
import logger from "../utils/logger";
import { hashPassword } from "../utils/password";

export const createCustomerUser = async (username: string, email: string, password: string) => {
  const hashedPassword = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      username,
      email,
      passwordHash: hashedPassword,
      role: "CUSTOMER" as Role,
    },
  });

  return user;
};

export const getUserById = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { userId } });
    if (!user) throw new AppError(404, `User with id ${userId} is not found`, "User not found", StatusCodes.NOT_FOUND);

    return user;
  } catch (error: any) {
    if (error instanceof AppError) throw error;

    throw new AppError(500, `Database error: ${error}`, "Internal server error", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}