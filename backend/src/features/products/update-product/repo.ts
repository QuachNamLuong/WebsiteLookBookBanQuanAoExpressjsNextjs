import type { PrismaClient, Product } from "@generated/prisma/client";
import { AppError } from "types/app";
import { StatusCodes } from "http-status-codes";
import type { UpdateProductBodySchema } from "./schema";

export async function getProductByIdRepo(prisma: PrismaClient, productId: number) {
  try {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    return product;
  } catch (error) {
    throw new AppError(
      1000,
      `Internal database error while fetching product ID ${productId} in getProductByIdRepo.`,
      "Unable to fetch product due to a database error",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export async function updateProductRepo(
  prisma: PrismaClient,
  productId: number,
  data: UpdateProductBodySchema
) {

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { name: data.product.name }
    });

    return updatedProduct;

  } catch (error) {
    throw new AppError(
      1002,
      `Internal database error while updating product ID ${productId} in updateProductRepo.`,
      "Unable to update product due to an internal error",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}