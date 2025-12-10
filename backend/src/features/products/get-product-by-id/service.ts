import type { PrismaClient } from "@generated/prisma";
import { AppError } from "types/app.d";
import { StatusCodes } from "http-status-codes";
import { getProductByIdRepo } from "./repo";
import { productToGetProductByIdResponseSchema } from "./mapping";

export async function getProductByIdService(prisma: PrismaClient, productId: number) {
  try {
    const product = await getProductByIdRepo(prisma, productId);
    if (product) return product;

    throw new AppError(
      1000,
      "Product not found in getProductByIdService of get-product-by-id feature",
      "Product not found",
      StatusCodes.NOT_FOUND
    );
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1001,
      "Internal error in getProductByIdService",
      "Unable to get product",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

