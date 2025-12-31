import type { Request, Response } from "express";
import type { RegisterBodySchema } from "./schema";
import { registerService } from "./service";
import { StatusCodes } from "http-status-codes";
import appConfig from "@config/app.config";
import jwtConfig from "@config/jwt.config";
import prisma from "lib/prisma";

export async function registerHandler(req: Request, res: Response) {
  const requestBody = req.body as RegisterBodySchema;
  const { accessToken, refreshToken } = await registerService(prisma, requestBody);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: appConfig.mode === "production",
    sameSite: "lax",
    maxAge: jwtConfig.expiresIn
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: appConfig.mode === "production",
    sameSite: "lax",
    maxAge: jwtConfig.refreshExpiresIn
  });

  res.clearCookie("guestId");

  res.status(StatusCodes.OK).json({
    message: "Register successfully",
  })
}