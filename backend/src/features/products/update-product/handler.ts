import type { Request, Response } from "express";
import prisma from "@infra/db/prisma";
import { StatusCodes } from "http-status-codes";
import type { UpdateProductBodySchema, UpdateProductParamsSchema } from "./schema";
import { updateProductService } from "./service";

export async function updateProductHandler(req: Request, res: Response) {
  const {productId} = (req.params as unknown) as UpdateProductParamsSchema;
  const updateProductData = req.body as UpdateProductBodySchema;
  await updateProductService(prisma, productId, updateProductData);
  res.status(StatusCodes.NO_CONTENT).end();
};