import type { PrismaClient, Product } from "@generated/prisma/client";
import { AppError } from "types/app.d";
import { StatusCodes } from "http-status-codes";
import logger from "utils/logger";

type ProductsWithCount = {
  products: Product[];
  totalCount: number;
};

type GetProductsOptions = {
  paging: {
    page: number;
    maxItem: number
  };
  query?: {
    name: string | undefined;
  };
};


export async function getProductsRepo(
  prisma: PrismaClient,
  options: GetProductsOptions
): Promise<ProductsWithCount> {

  const page = options.paging.page > 0 ? options.paging.page : 1;
  const skip = (page - 1) * options.paging.maxItem;

  try {
    const where = { ...((options.query && options.query.name) && { name: { contains: options.query.name } }) }
    const [products, totalCount] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        skip: skip,
        take: options.paging.maxItem,
      }),
      prisma.product.count({
        where,
      }),
    ]);

    return {
      products: products,
      totalCount: totalCount,
    };

  } catch (error) {
    logger.error(`[getProducts] Failed to fetch products with options: ${JSON.stringify(options)}`, error);

    throw new AppError(
      1000,
      "Internal error in getProducts service function",
      "Unable to fetch products",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}