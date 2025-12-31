import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { UpdateProductBodySchema, UpdateProductParamsSchema } from "./schema";
import { updateProductService } from "./service";
import prisma from "lib/prisma";

export async function updateProductHandler(req: Request, res: Response) {
  const {productId} = req.validatedData?.params as UpdateProductParamsSchema;
  const updateProductData = req.body as UpdateProductBodySchema;
  await updateProductService(prisma, productId, updateProductData);
  res.status(StatusCodes.NO_CONTENT).end();
};