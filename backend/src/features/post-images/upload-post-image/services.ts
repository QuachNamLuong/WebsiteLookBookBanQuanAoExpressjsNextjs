import type { PrismaClient } from "@generated/prisma";
import { createPostImageRepo, findTheFirstPostImageByPostId } from "./repo";
import { AppError } from "types/app";
import { StatusCodes } from "http-status-codes";
import { ensurePublicBucket, uploadFile } from "utils/minio";

export async function validatePostImageHelper(prisma: PrismaClient, postId: number) {
  try {
    const postImage = await findTheFirstPostImageByPostId(prisma, postId);
    if (postImage) throw new AppError(
      1000,
      "Feature image already exist",
      "Feature image already exist",
      StatusCodes.BAD_REQUEST
    );
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1000,
      `Failed to validatePostImageHelper: ${error}`,
      "Failed to validatePostImageHelper",
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}


const BUCKET_NAME = "post-images";
const PUBLIC_MINIO_URL = "http://localhost:9000"

export async function uploadPostImageService(prisma: PrismaClient, file: Express.Multer.File) {
  try {
    if (!file) throw new AppError(
      1000,
      `"File is required"`,
      "File is required",
      StatusCodes.BAD_REQUEST
    )

    if (!file.mimetype.startsWith("image/"))
      throw new AppError(
        1000,
        "Only image files allowed",
        "Only image files allowed",
        StatusCodes.BAD_REQUEST
      )

    await ensurePublicBucket(BUCKET_NAME);

    const ext = file.originalname.split(".").pop();
    const objectName = `${crypto.randomUUID()}.${ext}`;

    const result = await uploadFile(
      BUCKET_NAME,
      objectName,
      file.buffer
    );

    if (!result.success) throw new AppError(
      1000,
      "Upload failed",
      "Upload failed",
      StatusCodes.INTERNAL_SERVER_ERROR
    )

    const url = `${PUBLIC_MINIO_URL}/${BUCKET_NAME}/${objectName}`;

    return {
      url,
      name: file.originalname,
      size: file.size,
    };
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1000,
      `Failed to uploadPostImageService: ${error}`,
      "Failed to uploadPostImageService",
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}