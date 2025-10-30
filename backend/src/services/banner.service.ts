import { createReadStream, statSync } from "fs";
import logger from "../utils/logger";
import { ensureBucket, uploadFile } from "../utils/minio";
import minio from "../lib/minio";
import { AppError } from "../types/app";
import { ClientMessage, ClientMessages } from "../config/error.config";
import { StatusCodes } from "http-status-codes";

const HERO_BANNER_BUCKET = "HERO_BANNER"

ensureBucket(HERO_BANNER_BUCKET).catch((e) => logger.error(e));

export const uploadBannerImage = async (filePath: string, fileName: string) => {
  const fileStream = createReadStream(filePath);
  const fileStat = statSync(filePath);

  const { success, error } = await uploadFile(HERO_BANNER_BUCKET, fileName, filePath);
  if (error) throw new AppError(2000, `Can not upload banner image with error: ${error}`, "Can not upload banner file", StatusCodes.INTERNAL_SERVER_ERROR);
};

export const changeBannerImageName = async (oldName: string, newName: string) => {
  
};