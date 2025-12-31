import type { PrismaClient } from "@generated/prisma";
import { StatusCodes } from "http-status-codes";
import { AppError } from "types/app";

export async function getPostByIdRepo(prisma: PrismaClient, slug: string) {
  try {
    const post = prisma.post.findFirst({ where: { slug }, include: {images: true} });
    return post;
  } catch (error) {
    throw new AppError(
      1000,
      `Failed to getPostCategoriesService ${error}`,
      "Failed to getPostCategoriesService",
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}