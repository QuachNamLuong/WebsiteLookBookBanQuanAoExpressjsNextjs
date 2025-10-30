import minio from "../lib/minio";
import logger from "./logger";

export async function ensureBucket(bucketName: string) {
  const exists = await minio.bucketExists(bucketName);
  if (!exists) {
    await minio.makeBucket(bucketName, "");
    console.log(`Bucket "${bucketName}" created`);
  }
}

export const getListFileInBucket = async (bucketName: string) => {
  const isBucketExists = await minio.bucketExists(bucketName);
  if (!isBucketExists) {
    logger.error(`Bucket name ${bucketName} is not found`);
  }
  const fileNames: (string | undefined)[] = []
  minio.listObjectsV2(bucketName, "", true)
    .on("data", (obj) => {
      fileNames.push(obj.name)
    })
    .on("error", (e) => {
      logger.error(e);
    })
  
  return fileNames;
}

export const uploadFile = async (bucketName: string, objectName: string, filePath: string) => {
  try {
    await minio.fPutObject(bucketName, objectName, filePath, {});
    console.log(`File "${objectName}" uploaded to bucket "${bucketName}"`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to upload "${objectName}" to bucket "${bucketName}":`, error);
    return { success: false, error };
  }
}

export async function deleteFile(bucketName: string, objectName: string) {
  try {
    await minio.removeObject(bucketName, objectName);
    console.log(`File "${objectName}" removed from bucket "${bucketName}"`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete "${objectName}" from bucket "${bucketName}":`, error);
    return { success: false, error };
  }
}

export async function renameFile(bucketName: string, oldName: string, newName: string) {
  try {
    // Copy object to new name
    await minio.copyObject(
      bucketName,
      newName, // new object key
      `${bucketName}/${oldName}` // source path
    );

    // Delete the old object
    await minio.removeObject(bucketName, oldName);

    console.log(`Renamed "${oldName}" to "${newName}" in bucket "${bucketName}"`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to rename "${oldName}" to "${newName}" in bucket "${bucketName}":`, error);
    return { success: false, error };
  }
}