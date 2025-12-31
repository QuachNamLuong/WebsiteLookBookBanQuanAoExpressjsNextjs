import type { Request, Response } from "express";
import { getCategoriesSerive } from "./service";
import { StatusCodes } from "http-status-codes";
import prisma from "lib/prisma";

export async function getCategoriesHandler(_: Request, res: Response) {
  const categories = await getCategoriesSerive(prisma);
  res.status(StatusCodes.OK).json(categories);
}