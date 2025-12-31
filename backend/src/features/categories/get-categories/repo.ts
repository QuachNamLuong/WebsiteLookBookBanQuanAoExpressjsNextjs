import type { PrismaClient } from "@generated/prisma";
import { StatusCodes } from "http-status-codes";
import { AppError } from "types/app";

export async function getCategoriesRepo(prisma: PrismaClient) {
  try {
    const categories = await prisma.productCategory.findMany();
    return categories;
  } catch (error) {
    throw new AppError(
      100,
      "Unhandler error in getCategoriesRepo categories/get-categories",
      "Unhandler error",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}