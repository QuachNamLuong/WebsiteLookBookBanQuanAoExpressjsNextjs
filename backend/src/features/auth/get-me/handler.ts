import type { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "types/app.d";
import type { AuthenticatedRequest } from "types/express";

export async function getMeHandler(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  if (!userId) throw new AppError(1000, "UNAUTHORIZED", "UNAUTHORIZED", StatusCodes.UNAUTHORIZED);

  res.status(StatusCodes.OK).json({ user: { userId } });
}