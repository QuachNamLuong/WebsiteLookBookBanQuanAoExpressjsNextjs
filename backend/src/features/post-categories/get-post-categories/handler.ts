import prisma from "lib/prisma"
import { getPostCategoriesService } from "./service"
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function getPostCategoriesHandler(req: Request, res: Response) {
  const postCategories = await getPostCategoriesService(prisma);

  res.status(StatusCodes.OK).json(postCategories);
}