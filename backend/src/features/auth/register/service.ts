import type { PrismaClient } from "@generated/prisma";
import type { RegisterBodySchema } from "./schema";
import { AppError } from "types/app.d";
import { StatusCodes } from "http-status-codes";
import { createNewUserHelper, getRoleUserHelper, validateNewUserEmailHelper, validateNewUserUsernameHelper } from "./helper";
import { signAccessToken, signRefreshToken } from "utils/jwt";

export async function registerService(prisma: PrismaClient, request: RegisterBodySchema) {
  try {
    await validateNewUserEmailHelper(prisma, request.email);
    await validateNewUserUsernameHelper(prisma, request.username);
    const role = await getRoleUserHelper(prisma);
    const { userId } = await createNewUserHelper(prisma, role.id, request);
    const accessToken = signAccessToken({ userId });
    const refreshToken = signRefreshToken({ userId });

    return { accessToken, refreshToken };
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1000,
      `Unhandle error in registerService auth/register: ${error}`,
      "unhandler error", StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}