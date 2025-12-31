import type { PrismaClient } from "@generated/prisma";
import { StatusCodes } from "http-status-codes";
import { AppError } from "types/app";

export async function getAllProductCollectionRepo(prisma: PrismaClient) {
  try {
    const producCollections = await prisma.productCollection.findMany();
    return producCollections;
  } catch (error) {
    throw new AppError(
      1000,
      `Can not getAllProductCollection: ${error}`,
      "Can not getAllProductCollection",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}