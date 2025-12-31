import type { PrismaClient } from "@generated/prisma";
import { generateProductCodeHelper } from "./helper";
import { createProductRepo, getLastProductIdRepo } from "./repo";
import type { CreateProductBody } from "./schema";
import { AppError } from "types/app";
import logger from "utils/logger";
import { StatusCodes } from "http-status-codes";

async function getNextProductCode(prisma: PrismaClient) {
  const lastId = await getLastProductIdRepo(prisma);
  const nextId = lastId + 1;
  return generateProductCodeHelper(nextId);
}

export async function createProductService(prisma: PrismaClient, request: CreateProductBody) {
  try {
    const productId = await createProductRepo(prisma, {
      name: request.name,
      code: await getNextProductCode(prisma),
      price: request.price,
      stock: request.quantity,
      color: request.color,
      material: request.material,
      nameMean: request.nameMeaning,
      style: request.style,
      usage: request.usage
    });
    return productId;
  } catch (error) {
    if (error instanceof AppError) throw error;

    logger.error("An expected error", error);
    throw new AppError(
      1000,
      "An expected error",
      "An expected error",
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

