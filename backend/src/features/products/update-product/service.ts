import type { PrismaClient } from "@generated/prisma";
import { AppError } from "types/app";
import type { UpdateProductBodySchema } from "./schema";
import { getProductByIdRepo, updateProductRepo } from "./repo";
import { StatusCodes } from "http-status-codes";

async function validateProductById(prisma: PrismaClient, productId: number) {
  try {
    const product = getProductByIdRepo(prisma, productId);
    if (!product) throw new AppError(1000, "product not found", "product not found", StatusCodes.NOT_FOUND);
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

export async function updateProductService(prisma: PrismaClient, productId: number, updateProductData: UpdateProductBodySchema) {
  try {
    await validateProductById(prisma, productId);
    await updateProductRepo(prisma, productId, {
      color: updateProductData.color,
      material: updateProductData.material,
      name: updateProductData.name,
      nameMean: updateProductData.nameMean,
      price: updateProductData.price,
      stock: updateProductData.stock,
      style: updateProductData.style,
      usage: updateProductData.usage,
      // productCategory: { connect: { id: updateProductData.productCategoryId } }
    });
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

