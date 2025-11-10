import { StatusCodes } from "http-status-codes";
import prisma from "../../lib/prisma";
import { AppError } from "../../types/app.d";

export const getUserProfile = async (userId: string) => {
  try {
    const userProfile = await prisma.user.findUnique({
      where: { userId: userId },
    });

    if (!userProfile) {
      throw new AppError(
        100,
        "User not found in database",
        "The requested user does not exist",
        StatusCodes.NOT_FOUND
      );
    }

    return userProfile; // ✅ important: return the user if found

  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      100,
      "Internal server error: " + (error instanceof Error ? error.message : error),
      "Something went wrong, please try again",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};