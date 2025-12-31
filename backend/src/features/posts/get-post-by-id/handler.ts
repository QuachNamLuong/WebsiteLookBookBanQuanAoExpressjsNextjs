import type { Request, Response } from "express";
import type { GetPostByIdRequestParams } from "./schema";
import { getPostByIdService } from "./service";
import prisma from "lib/prisma";
import { StatusCodes } from "http-status-codes";

export async function getPostByIdHandler(req: Request, res: Response) {
  const { postId } = req.validatedData?.params as GetPostByIdRequestParams;

  const post = await getPostByIdService(prisma, postId);

  res.status(StatusCodes.OK).json(post);
}