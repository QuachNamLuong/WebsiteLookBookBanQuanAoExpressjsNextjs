import type { Response, Request } from "express";
import type { CreatePostImageRequestParams } from "./schema";
import prisma from "lib/prisma";
import { StatusCodes } from "http-status-codes";
import { createProductImageService } from "./services";


export async function createProductImageHandler(req: Request, res: Response) {
  const file = req.file as Express.Multer.File;
  const { productId } = req.params;

  const responseData = await createProductImageService(prisma, Number(productId), file);

  res.status(StatusCodes.OK).json(responseData);
}
