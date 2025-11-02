import { createReadStream, statSync } from "fs";
import logger from "../utils/logger";
import { deleteFile, ensureBucket, renameFile, uploadFile } from "../utils/minio";
import minio from "../lib/minio";
import { AppError } from "../types/app";
import { ClientMessage, ClientMessages } from "../constants/error";
import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma";

const HERO_BANNER_BUCKET = "HERO_BANNER"

ensureBucket(HERO_BANNER_BUCKET).catch((e) => logger.error(e));

export const uploadHeroBannerImage = async (filePath: string, fileName: string) => {
  const fileStream = createReadStream(filePath);
  const fileStat = statSync(filePath);

  const { success, error } = await uploadFile(HERO_BANNER_BUCKET, fileName, filePath);
  if (error) throw new AppError(2000, `Can not upload Hero banner image with error: ${error}`, "Can not upload Hero banner file", StatusCodes.INTERNAL_SERVER_ERROR);

  const bannerImage = await prisma.bannerImage.create({ data: { fileName } });
  if (!bannerImage) throw new AppError(1, "", "", StatusCodes.INTERNAL_SERVER_ERROR);
};

export const changeHeroBannerImageName = async (oldName: string, newName: string) => {
  const { error } = await renameFile(HERO_BANNER_BUCKET, oldName, newName);
  if (error) throw new AppError(2000, `Can not rename Hero banner image with error: ${error}`, "Can not rename Hero banner file", StatusCodes.INTERNAL_SERVER_ERROR);

  const bannerImage = await prisma.bannerImage.update({ where: { fileName: oldName }, data: { fileName: newName } });
  if (!bannerImage) throw new AppError(1, "", "", StatusCodes.INTERNAL_SERVER_ERROR);
};

export const deleteHeroBannerImage = async (fileName: string) => {
  const { error } = await deleteFile(HERO_BANNER_BUCKET, fileName);
  if (error) throw new AppError(2000, `Can not delete Hero banner image with error: ${error}`, "Can not delete Hero banner file", StatusCodes.INTERNAL_SERVER_ERROR);

  const bannerImage = await prisma.bannerImage.delete({ where: { fileName } });
  if (!bannerImage) throw new AppError(1, "", "", StatusCodes.INTERNAL_SERVER_ERROR);
};

export const getHeroBannerImage = async () => {

};