import type { Request, Response } from "express";
import type { CreateProductBody } from "./schema";
import { createProductService } from "./service";
import { StatusCodes } from "http-status-codes";
import prisma from "lib/prisma";

export async function createProductHandler(req: Request, res: Response) {
  const body = req.body as CreateProductBody;
  const productId = await createProductService(prisma, body);
  res.status(StatusCodes.CREATED).json({
    productId
  });
};