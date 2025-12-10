import type { Request, Response } from "express";
import prisma from "@infra/db/prisma";
import { StatusCodes } from "http-status-codes";
import type { GetProductsQuerySchema } from "./schema";
import { getProductsService } from "./service";

export async function getProductsHandler(req: Request, res: Response) {
  const { limit, page, category, search } = req.validatedData?.query as GetProductsQuerySchema;
  
  const {products, totalCount, currentPage, totalPages} = await getProductsService(prisma, {limit, page, category, search});
  res.status(StatusCodes.OK).json({
    data: products,
    totalRecords: totalCount,
    currentPage: currentPage,
    totalPages: totalPages,
  });
};