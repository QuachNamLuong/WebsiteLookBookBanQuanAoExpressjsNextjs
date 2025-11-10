import type { Request, Response } from "express";
import { getUserProfile } from "./user.service";
import { type GetUserProfileParamsSchema } from "./user.shema";
import { AppError } from "../../types/app.d";
import { StatusCodes } from "http-status-codes";

export const getUserProfileHandler = async (req: Request, res: Response) => {
  const { userId } = req.params as GetUserProfileParamsSchema;

  const userProfile = await getUserProfile(userId);

  res.status(200).json(userProfile);
};