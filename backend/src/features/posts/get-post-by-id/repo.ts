import type { PrismaClient } from "@generated/prisma";
import { StatusCodes } from "http-status-codes";
import { AppError } from "types/app";

export async function getPostByIdRepo(prisma: PrismaClient, postId: number) {
  try {
    const post = prisma.post.findUnique({ where: { id: postId }, include: {images: true} });
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