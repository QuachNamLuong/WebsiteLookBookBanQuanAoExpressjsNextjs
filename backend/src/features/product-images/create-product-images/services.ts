import type { PrismaClient } from "@generated/prisma";
import { AppError } from "types/app";
import { StatusCodes } from "http-status-codes";
import { ensurePublicBucket, uploadFile } from "utils/minio";


const BUCKET_NAME = "product-images";
const PUBLIC_MINIO_URL = "http://localhost:9000"

export async function createProductImageService(prisma: PrismaClient, productId: number, file: Express.Multer.File) {
  try {
    if (!file) throw new AppError(
      1000,
      `"File is required"`,
      "File is required",
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
    const productImage = await prisma.productImage.create({
      data: {
        href: url,
        productId,
      }
    })
    return {
      id: productImage.id,
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