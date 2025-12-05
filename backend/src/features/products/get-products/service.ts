import type { PrismaClient } from "@generated/prisma";
import { AppError } from "types/app";
import { StatusCodes } from "http-status-codes";
import { getProductsRepo } from "./repo";
import type { GetProductsQuerySchema } from "./schema";

export async function getProductsService(prisma: PrismaClient, query: GetProductsQuerySchema) {
  try {
    const products = await getProductsRepo(prisma, {paging: {page: query.page, maxItem: query.limit}, query: {name: query.search}});
    return products;
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

