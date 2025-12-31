import type { PrismaClient, Product, ProductImage } from "@generated/prisma/client";
import { AppError } from "types/app";
import { StatusCodes } from "http-status-codes";
import logger from "utils/logger";

// ✅ MODIFIED: Updated the return type to include page and totalPages
export type ProductsWithPagination = {
  products: Product & (ProductImage[])[];
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
  slug?: string | undefined;
  category?: string | undefined;
};


export async function getProductsRepo(
  prisma: PrismaClient,
  options: GetProductsOptions
) { // ✅ USE NEW TYPE

  const page = options.paging.page > 0 ? options.paging.page : 1;
  const maxItem = options.paging.maxItem; // Use a clearer variable name
  const skip = (page - 1) * maxItem;

  try {
    if (options.slug) {
      const products = await prisma.product.findMany({ where: { productCollection: { slug: options.slug } }, include: { productImage: true } });
      return {
        products,
        totalCount: products.length,
        currentPage: 1,
        totalPages: 1,
      };
    }

    if (options.category) {
      const [products, totalCount] = await prisma.$transaction([
        prisma.product.findMany({
          where: { productCategory: { slug: options.category } },
          skip: skip,
          take: maxItem,
          include: { productImage: true }
        }),
        prisma.product.count({
          where: { productCategory: { slug: options.category } },
        }),
      ]);
      const totalPages = Math.ceil(totalCount / maxItem);
      return {
        products: products,
        totalCount: totalCount,
        currentPage: page,
        totalPages: totalPages,
      };
    }
    // Construct the 'where' clause, ensuring it's an empty object if no name is provided.
    const where = options.query?.name
      ? { name: { contains: options.query.name } }
      : {};

    const [products, totalCount] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        skip: skip,
        take: maxItem,
        include: { productImage: true }
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