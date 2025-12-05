import type { Request, Response } from "express";
import type { CreateProductBody } from "./schema";
import { createProductService } from "./service";
import prisma from "@infra/db/prisma";
import { StatusCodes } from "http-status-codes";

export async function createProductHandler(req: Request, res: Response) {
  const body = req.body as CreateProductBody;
  const productId = await createProductService(prisma, body);
  res.status(StatusCodes.CREATED).json({
    productId
  });
};