import type { PrismaClient } from "@generated/prisma";
import { getPostByIdRepo } from "./repo";
import { AppError } from "types/app";
import { StatusCodes } from "http-status-codes";

export async function getPostByIdService(prisma: PrismaClient, postId: number) {
  try {
    const post = await getPostByIdRepo(prisma, postId);
    return post;
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1000,
      `Failed to getPostCategoriesService ${error}`,
      "Failed to getPostCategoriesService",
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}