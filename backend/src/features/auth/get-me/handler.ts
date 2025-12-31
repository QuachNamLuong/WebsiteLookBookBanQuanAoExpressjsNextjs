import appConfig from "@config/app.config";
import type { Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { AuthenticatedRequest } from "types/express";
import { v4 as uuid } from "uuid";
import { getUserRoles } from "./repo";
import prisma from "lib/prisma";
import { verifyAccessToken } from "utils/jwt";

export async function getMeHandler(
  req: AuthenticatedRequest,
  res: Response
) {
  let guestId = req.cookies.guestId;
  const { accessToken } = req.cookies;
  let userId: string | undefined
  try {
    const payload = verifyAccessToken(accessToken);
    userId = payload.userId;
  } catch (_) {

  }

  if (userId) {
    const roles = await getUserRoles(prisma, userId);

    return res.status(StatusCodes.OK).json({
      isAuthenticated: true,
      roles,
    });
  }

  if (!guestId) {
    guestId = uuid();

    res.cookie("guestId", guestId, {
      httpOnly: true,
      secure: appConfig.mode === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  return res.status(StatusCodes.OK).json({
    isAuthenticated: false,
    roles: ["GUEST"],
  });
}
