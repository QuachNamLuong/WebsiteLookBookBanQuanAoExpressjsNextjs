import type { Request, Response } from "express";
import type { GetProductByIdParamsSchema } from "./schema";
import { getProductByIdService } from "./service";
import prisma from "@infra/db/prisma";
import { StatusCodes } from "http-status-codes";

export async function getProductByIdHandler(req: Request, res: Response) {
  const { productId } = (req.params as unknown) as GetProductByIdParamsSchema;
  const response = await getProductByIdService(prisma, productId);
  res.status(StatusCodes.OK).json(response);
};