import type { Request, Response } from "express";
import type { DeleteProductParamsSchema } from "./schema";
import { deleteProductByIdService } from "./service";
import { StatusCodes } from "http-status-codes";
import prisma from "lib/prisma";

export async function deleteProductByIdHandler(req: Request, res: Response) {
  const { productId } = req.validatedData?.params as DeleteProductParamsSchema;
  await deleteProductByIdService(prisma, productId);
  res.status(StatusCodes.NO_CONTENT).end();
};