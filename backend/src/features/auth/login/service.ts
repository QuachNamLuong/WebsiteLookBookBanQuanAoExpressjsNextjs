import type { PrismaClient } from "@generated/prisma";
import type { LoginBodySchema } from "./schema";
import { AppError } from "types/app.d";
import { StatusCodes } from "http-status-codes";
import { getUserByEmailRepo, getUserByUsernameRepo } from "./repo";
import { comparePassword } from "utils/password";
import { signAccessToken, signRefreshToken } from "utils/jwt";

export async function loginByEmailService(prisma: PrismaClient, loginData: LoginBodySchema) {
  try {
    const user = await getUserByEmailRepo(prisma, loginData.identifier);
    if (!user)
      throw new AppError(
        100,
        "user not found",
        "User or password not correct",
        StatusCodes.UNAUTHORIZED
      );

    const isPasswordCorrect = await comparePassword(loginData.password, user.passwordHash);
    if (!isPasswordCorrect)
      throw new AppError(
        1000,
        "Password is uncorrect",
        "User or password not correct",
        StatusCodes.UNAUTHORIZED
      );

    const accessToken = signAccessToken({ userId: user.id });
    const refreshToken = signRefreshToken({ userId: user.id });
    return { accessToken, refreshToken };
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1000,
      "An unexpected error in loginByEmailService from auth/feature",
      "Unhandle error",
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export async function loginByUsernameService(prisma: PrismaClient, loginData: LoginBodySchema) {
  try {
    const user = await getUserByUsernameRepo(prisma, loginData.identifier);
    if (!user)
      throw new AppError(
        100,
        "user not found",
        "User or password not correct",
        StatusCodes.UNAUTHORIZED
      );

    const isPasswordCorrect = await comparePassword(loginData.password, user.passwordHash);
    if (!isPasswordCorrect)
      throw new AppError(
        1000,
        "Password is uncorrect",
        "User or password not correct",
        StatusCodes.UNAUTHORIZED
      );

    const accessToken = signAccessToken({ userId: user.id });
    const refreshToken = signRefreshToken({ userId: user.id });
    return { accessToken, refreshToken };
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1000,
      "An unexpected error in loginByEmailService from auth/feature",
      "Unhandle error",
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}