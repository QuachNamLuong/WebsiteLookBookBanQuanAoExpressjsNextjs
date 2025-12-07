import type { PrismaClient } from "@generated/prisma";
import type { ChangePasswordRequestBodySchema } from "./schema";
import { updateUserPasswordRepo } from "./repo";
import { getUserByIdOrThrowHelper } from "./helper";
import { AppError } from "types/app";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "utils/password";
import { signAccessToken, signRefreshToken } from "utils/jwt";

export async function changePasswordService(prisma: PrismaClient, userId: number, request: ChangePasswordRequestBodySchema) {
  try {
    const user = await getUserByIdOrThrowHelper(prisma, userId);
    const isPasswordCorrect = await comparePassword(request.oldPassword, user.passwordHash);
    if (!isPasswordCorrect)
      throw new AppError(
        1000,
        "Old password mismatch during change-password.",
        "Invalid current password.",
        StatusCodes.BAD_REQUEST
      );

    const newPasswordHash = await hashPassword(request.newPassword);
    await updateUserPasswordRepo(prisma, userId, newPasswordHash);
    const accessToken = signAccessToken({ userId });
    const refreshToken = signRefreshToken({ userId });
    return { accessToken, refreshToken };
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      100,
      `Unhandled error in changePasswordService: ${error}`,
      "An unexpected error occurred while changing password.",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}