import type { Request, Response } from "express";
import type { GetProductByIdParamsSchema } from "./schema";
import { getProductByIdService } from "./service";
import { StatusCodes } from "http-status-codes";
import prisma from "lib/prisma";

export async function getProductByIdHandler(req: Request, res: Response) {
  const { productId } = req.validatedData?.params as GetProductByIdParamsSchema;
  const response = await getProductByIdService(prisma, productId);
  res.status(StatusCodes.OK).json(response);
};