import type { Response, Request } from "express";
import type { CreatePostImageRequestParams } from "./schema";
import { uploadPostImageService } from "./services";
import prisma from "lib/prisma";
import { StatusCodes } from "http-status-codes";


export async function uploadImageHandler(req: Request, res: Response) {
  const file = req.file as Express.Multer.File;

  const responseData = await uploadPostImageService(prisma, file);

  res.status(StatusCodes.OK).json(responseData);
}
