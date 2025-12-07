import type { Request, Response } from "express";
import appConfig from "@config/app.config";
import { StatusCodes } from "http-status-codes";

export async function logoutHandler(req: Request, res: Response) {
  res.cookie("accessToken", "", {
    httpOnly: true,
    secure: appConfig.mode === "production",
    sameSite: "strict",
    maxAge: 0
  });

  res.cookie("refreshToken", "", {
    httpOnly: true,
    secure: appConfig.mode === "production",
    sameSite: "strict",
    maxAge: 0
  });

  res.status(StatusCodes.NO_CONTENT).end()
}