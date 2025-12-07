import type { Request, Response } from "express";
import { getCategoriesSerive } from "./service";
import prisma from "@infra/db/prisma";
import { StatusCodes } from "http-status-codes";

export async function getCategoriesHandler(_: Request, res: Response) {
  const categories = await getCategoriesSerive(prisma);
  res.status(StatusCodes.OK).json({ data: categories });
}