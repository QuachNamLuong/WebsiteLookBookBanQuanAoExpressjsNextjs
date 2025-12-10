import type { Request, Response } from "express";
import type { DeleteProductParamsSchema } from "./schema";
import { deleteProductByIdService } from "./service";
import prisma from "@infra/db/prisma";
import { StatusCodes } from "http-status-codes";

export async function deleteProductByIdHandler(req: Request, res: Response) {
  const { productId } = req.validatedData?.params as DeleteProductParamsSchema;
  await deleteProductByIdService(prisma, productId);
  res.status(StatusCodes.NO_CONTENT).end();
};