import type { PrismaClient, Product } from "@generated/prisma/client";
import { AppError } from "types/app.d";
import { StatusCodes } from "http-status-codes";
import logger from "utils/logger";

// ✅ MODIFIED: Updated the return type to include page and totalPages
export type ProductsWithPagination = {
  products: Product[];
  totalCount: number;
  currentPage: number; // Current page number being returned
  totalPages: number;  // Total number of pages
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
): Promise<ProductsWithPagination> { // ✅ USE NEW TYPE

  const page = options.paging.page > 0 ? options.paging.page : 1;
  const maxItem = options.paging.maxItem; // Use a clearer variable name
  const skip = (page - 1) * maxItem;

  try {
    // Construct the 'where' clause, ensuring it's an empty object if no name is provided.
    const where = options.query?.name 
      ? { name: { contains: options.query.name } } 
      : {};
      
    const [products, totalCount] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        skip: skip,
        take: maxItem,
      }),
      prisma.product.count({
        where,
      }),
    ]);
    
    // ✅ CALCULATE totalPages
    const totalPages = Math.ceil(totalCount / maxItem);

    // ✅ RETURN the new fields
    return {
      products: products,
      totalCount: totalCount,
      currentPage: page,
      totalPages: totalPages,
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