import type { Prisma, PrismaClient } from "@generated/prisma";
import { StatusCodes } from "http-status-codes";
import { AppError } from "types/app";

export async function findTheFirstPostImageByPostId(prisma: PrismaClient, postId: number) {
  try {
    const postImage = await prisma.postImage.findFirst({where: {postId}});
    return postImage;
  } catch (error) {
    throw new AppError(
      1000,
      `Failed to createPostImageRepo: ${error}`,
      "Failed to createPostImageRepo",
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export async function createPostImageRepo(prisma: PrismaClient, data: Prisma.PostImageCreateInput) {
  try {
    await prisma.postImage.create({ data: data })
  } catch (error) {
    throw new AppError(
      1000,
      `Failed to createPostImageRepo: ${error}`,
      "Failed to createPostImageRepo",
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}