import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { GetProductsQuerySchema } from "./schema";
import { getProductsService } from "./service";
import prisma from "lib/prisma";

export async function getProductsHandler(req: Request, res: Response) {
  const { limit, page, category, search, slug } = req.validatedData?.query as GetProductsQuerySchema;
  
  const {products, totalCount, currentPage, totalPages} = await getProductsService(prisma, {limit, page, category, search, slug});
  res.status(StatusCodes.OK).json({
    data: products,
    totalRecords: totalCount,
    currentPage: currentPage,
    totalPages: totalPages,
  });
};