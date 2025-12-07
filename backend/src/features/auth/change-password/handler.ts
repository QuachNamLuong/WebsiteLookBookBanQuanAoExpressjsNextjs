import type { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "types/app";
import type { AuthenticatedRequest } from "types/express";
import { changePasswordService } from "./service";
import prisma from "@infra/db/prisma";
import type { ChangePasswordRequestBodySchema } from "./schema";
import appConfig from "@config/app.config";
import jwtConfig from "@config/jwt.config";

export async function changePasswordHandler(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const body = req.body as ChangePasswordRequestBodySchema;
  if (!userId) throw new AppError(1000, "", "", StatusCodes.UNAUTHORIZED);

  const { accessToken, refreshToken } = await changePasswordService(prisma, userId, body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: appConfig.mode === "production",
    sameSite: "strict",
    maxAge: jwtConfig.expiresIn
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: appConfig.mode === "production",
    sameSite: "strict",
    maxAge: jwtConfig.expiresIn
  });

  res.status(StatusCodes.NO_CONTENT).end();
}