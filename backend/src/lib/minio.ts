import { Client } from "minio";
import minioConfig, { STARS_IMAGE_BUCKET } from "../config/minio.config";
import { ensureBucket } from "../utils/minio";
import logger from "../utils/logger";

const minio = new Client({
  endPoint: minioConfig.endPoint,
  port: minioConfig.port,
  useSSL: minioConfig.useSSL,
  accessKey: minioConfig.accessKey,
  secretKey: minioConfig.secretKey
});

ensureBucket(STARS_IMAGE_BUCKET).catch((e) => logger.error(e));

export default minio;