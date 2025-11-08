import prisma from "../lib/prisma";
import { AppError } from "../types/app.d";
import logger from "../utils/logger";

export const getProductImagesByProductId = async (productId: string) => {
  try {
    const productImages = await prisma.productImage.findMany({ where: { productId } });
    return productImages;
  } catch (e) {
    logger.error(e);
    throw new AppError(100, "Can not get product image", "", 500);
  }
};