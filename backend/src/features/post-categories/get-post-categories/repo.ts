import type { PrismaClient } from "@generated/prisma";
import { StatusCodes } from "http-status-codes";
import { AppError } from "types/app";

export async function getPostCategoriesRepo(prisma: PrismaClient) {
  try {
    const postCategories = await prisma.postCategory.findMany();
    return postCategories;
  } catch (error) {
    throw new AppError(
      1000,
      `Failed to getPostCategoriesRepo id: ${error}`,
      "Failed to getPostCategoriesRepo id",
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}