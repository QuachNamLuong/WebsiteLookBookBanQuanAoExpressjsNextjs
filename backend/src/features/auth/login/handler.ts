import type { Request, Response } from "express";
import type { LoginBodySchema } from "./schema";
import z from "zod";
import { loginByEmailService, loginByUsernameService } from "./service";
import appConfig from "@config/app.config";
import jwtConfig from "@config/jwt.config";
import { StatusCodes } from "http-status-codes";
import prisma from "lib/prisma";

export async function loginHandler(req: Request, res: Response) {
  const body = req.body as LoginBodySchema

  const isEmail = z.email().safeParse(body.identifier).success;

  const { accessToken, refreshToken } = (isEmail) ? await loginByEmailService(prisma, body) : await loginByUsernameService(prisma, body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: appConfig.mode === "production",
    sameSite: "lax" as const,
    maxAge: jwtConfig.expiresIn
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: appConfig.mode === "production",
    sameSite: "lax" as const,
    maxAge: jwtConfig.expiresIn
  });

  res.status(StatusCodes.NO_CONTENT).end()
}