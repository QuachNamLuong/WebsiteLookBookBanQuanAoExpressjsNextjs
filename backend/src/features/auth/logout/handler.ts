import type { Request, Response } from "express";
import appConfig from "@config/app.config";
import { StatusCodes } from "http-status-codes";

export async function logoutHandler(req: Request, res: Response) {
  const cookieOptions = {
    httpOnly: true,
    secure: appConfig.mode === "production",
    sameSite: "lax" as const,
  };

  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);

  res.status(StatusCodes.NO_CONTENT).end()
}