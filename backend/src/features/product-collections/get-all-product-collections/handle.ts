import type { Request, Response } from "express";
import { getAllProductCollectionService } from "./service";
import prisma from "lib/prisma";
import { StatusCodes } from "http-status-codes";

export async function getAllProductCollectionsHandler(req: Request, res: Response) {
  const productCollections = await getAllProductCollectionService(prisma);
  res.status(StatusCodes.OK).json(productCollections);
}