import { STARS_IMAGE_BUCKET } from "../config/minio.config";
import minio from "../lib/minio";
import logger from "../utils/logger";
import { ensureBucket } from "../utils/minio";

ensureBucket("banner").catch((e) => {logger.error(e)});

export const getBannerImage = () => {
  minio.getObject("banner", )
}