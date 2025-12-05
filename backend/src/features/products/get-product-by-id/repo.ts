import type { PrismaClient } from "@generated/prisma";
import { AppError } from "types/app";
import { StatusCodes } from "http-status-codes";
import logger from "utils/logger";

export async function getProductByIdRepo(prisma: PrismaClient, productId: number) {
  try {
    return await prisma.product.findUnique({
      where: { id: productId },
    });
  } catch (error) {
    logger.error(`[getProductByIdRepo] Failed to get product id ${productId}`, error);

    throw new AppError(
      1000,
      "Internal error in getProductByIdRepo",
      "Unable to fetch product",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}