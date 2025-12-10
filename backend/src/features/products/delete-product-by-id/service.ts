import type { PrismaClient } from "@generated/prisma";
import { AppError } from "types/app.d";
import { StatusCodes } from "http-status-codes";
import { deleteProductByIdRepo, getProductByIdRepo } from "./repo";

export async function validateProductById(prisma: PrismaClient, productId: number) {
  try {
    const product = await getProductByIdRepo(prisma, productId);

    if (!product) {
      throw new AppError(
        1002,
        "Product not found in validateProductById",
        "Product does not exist",
        StatusCodes.NOT_FOUND
      );
    }
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1003,
      `Internal error in validateProductById: ${error}`,
      "Unable to validate product",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}


export async function deleteProductByIdService(prisma: PrismaClient, productId: number) {
  try {
    await validateProductById(prisma, productId)
    await deleteProductByIdRepo(prisma, productId);
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1001,
      "Internal error in deleteProductByIdService",
      "Unable to delete product",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

