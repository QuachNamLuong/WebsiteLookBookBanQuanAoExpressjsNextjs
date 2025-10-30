interface MinioConfig {
  endPoint: string;
  port: number;
  useSSL: boolean;
  accessKey: string;
  secretKey: string;
}

const minioConfig: MinioConfig = {
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'minioadmin',
  secretKey: 'minioadmin'
}

export const STARS_IMAGE_BUCKET = "stars-image";

export default minioConfig;