import type { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { AuthenticatedRequest } from "../types/express";
import { verifyAccessToken } from "../utils/jwt";
import prisma from "lib/prisma";
import { AppError } from "types/app.d";
import type { RoleName } from "@generated/prisma";

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });

  try {
    const { userId } = verifyAccessToken(token);
    req.userId = userId;
    return next();
  } catch {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid or expired token" });
  }
};

export const authorize =
  (...allowedRoles: RoleName[]) =>
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const userId = req.userId;
      if (!userId) throw new AppError(100, "UNAUTHORIZED", "UNAUTHORIZED", StatusCodes.UNAUTHORIZED);
      const user = await prisma.user.findUnique({ where: { id: userId }, include: { roles: true } });
      if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
      if (!user.roles.some(role => allowedRoles.includes(role.name))) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden: insufficient role" });
      }
      next();
    };
