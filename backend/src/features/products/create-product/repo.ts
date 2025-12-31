import type { Prisma, PrismaClient } from "@generated/prisma";
import { AppError } from "types/app";
import { StatusCodes } from "http-status-codes";
import logger from "utils/logger";

export async function getLastProductIdRepo(prisma: PrismaClient) {
  try {
    const last = await prisma.product.findFirst({
      orderBy: { id: "desc" },
      select: { id: true },
    });

    return last?.id ?? 0;
  } catch (error) {
    throw new AppError(
      1000,
      "Failed to get last product id",
      "Failed to get last product id",
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}


export async function createProductRepo(prisma: PrismaClient, data: Prisma.ProductCreateInput) {
  try {
    const { id } = await prisma.product.create({ data });
    return id;
  } catch (error) {
    logger.error("Failed to create product id:", error);
    throw new AppError(
      1000,
      "Failed to create product id",
      "Failed to create product id",
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}