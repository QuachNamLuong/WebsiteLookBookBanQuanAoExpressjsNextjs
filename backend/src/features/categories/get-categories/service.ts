import type { PrismaClient } from "@generated/prisma";
import { getCategoriesRepo } from "./repo";
import { AppError } from "types/app";
import { StatusCodes } from "http-status-codes";

export async function getCategoriesSerive(prisma: PrismaClient) {
  try {
    const categories = await getCategoriesRepo(prisma);
    return categories;
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      100,
      "Unhandler error in getCategoriesRepo categories/get-categories",
      "Unhandler error",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}