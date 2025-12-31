import type { PrismaClient } from "@generated/prisma";
import { AppError } from "types/app";
import { getAllProductCollectionRepo } from "./repo";
import { StatusCodes } from "http-status-codes";

export async function getAllProductCollectionService(prisma: PrismaClient) {
  try {
    const productCollections = await getAllProductCollectionRepo(prisma);
    return productCollections;
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1000,
      `Can not getAllProductCollection: ${error}`,
      "Can not getAllProductCollection",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}