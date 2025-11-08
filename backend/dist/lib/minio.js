import { Client } from "minio";
import minioConfig from "../config/minio.config";
import { ensurePublicBucket } from "../utils/minio";
import logger from "../utils/logger";
const minio = new Client({
    endPoint: minioConfig.endPoint,
    port: minioConfig.port,
    useSSL: minioConfig.useSSL,
    accessKey: minioConfig.accessKey,
    secretKey: minioConfig.secretKey
});
export default minio;
//# sourceMappingURL=minio.js.map