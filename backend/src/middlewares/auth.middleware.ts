import type { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { Role } from "../generated/prisma";
import type { AuthenticatedRequest } from "../types/express";
import { verifyAccessToken } from "../utils/jwt";

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    return next();
  } catch {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid or expired token" });
  }
};

export const authorize =
  (...allowedRoles: Role[]) =>
    (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const user = req.user;
      if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
      if (!allowedRoles.includes(user.role)) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden: insufficient role" });
      }
      next();
    };
