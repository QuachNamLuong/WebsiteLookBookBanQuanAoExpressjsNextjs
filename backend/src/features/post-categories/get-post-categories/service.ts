import type { PrismaClient } from "@generated/prisma";
import { AppError } from "types/app";
import { getPostCategoriesRepo } from "./repo";
import { StatusCodes } from "http-status-codes";

export async function getPostCategoriesService(prisma: PrismaClient) {
  try {
    const postCategories = await getPostCategoriesRepo(prisma);
    return postCategories;
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1000,
      `Failed to getPostCategoriesService ${error}`,
      "Failed to getPostCategoriesService",
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}