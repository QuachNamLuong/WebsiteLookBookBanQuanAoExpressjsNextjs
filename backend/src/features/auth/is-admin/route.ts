import { Router, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "lib/prisma";
import { authenticate } from "middlewares/auth.middleware";
import { AppError } from "types/app";
import type { AuthenticatedRequest } from "types/express";
import { catchAsync } from "utils/catch-async";

const isAdminRoute = Router();

isAdminRoute.get("/is-admin", authenticate, catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;
  if (!userId) throw new AppError(101, "UNAUTHORIZED", "Not logged in", StatusCodes.UNAUTHORIZED);
  const adminUser = await prisma.user.findUnique({ where: { id: userId, roles: { some: { name: "ADMIN" } } } });
  if (!adminUser) throw new AppError(102, "FORBIDDEN", "Admin access required", StatusCodes.FORBIDDEN);

  res.status(StatusCodes.NO_CONTENT).end();
}));

export default isAdminRoute;