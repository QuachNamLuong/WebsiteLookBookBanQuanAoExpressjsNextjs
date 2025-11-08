import minio from "../lib/minio";
import logger from "./logger";
export async function ensurePublicBucket(bucketName) {
    try {
        // 1️⃣ Check if bucket exists
        const exists = await minio.bucketExists(bucketName);
        if (!exists) {
            await minio.makeBucket(bucketName);
            console.log(`✅ Created bucket: ${bucketName}`);
        }
        else {
            console.log(`ℹ️ Bucket already exists: ${bucketName}`);
        }
        // 2️⃣ Set public read policy
        const policy = {
            Version: "2012-10-17",
            Statement: [
                {
                    Effect: "Allow",
                    Principal: { AWS: ["*"] },
                    Action: ["s3:GetObject"],
                    Resource: [`arn:aws:s3:::${bucketName}/*`],
                },
            ],
        };
        await minio.setBucketPolicy(bucketName, JSON.stringify(policy));
        console.log(`🌍 Bucket "${bucketName}" is now public (read-only).`);
        return { success: true };
    }
    catch (error) {
        console.error(`❌ Failed to ensure public bucket "${bucketName}":`, error);
        return { success: false, error };
    }
}
export const getListFileInBucket = async (bucketName) => {
    const isBucketExists = await minio.bucketExists(bucketName);
    if (!isBucketExists) {
        logger.error(`Bucket name ${bucketName} is not found`);
    }
    const fileNames = [];
    minio.listObjectsV2(bucketName, "", true)
        .on("data", (obj) => {
        fileNames.push(obj.name);
    })
        .on("error", (e) => {
        logger.error(e);
    });
    return fileNames;
};
export const uploadFile = async (bucketName, objectName, fileBuffer) => {
    try {
        await minio.putObject(bucketName, objectName, fileBuffer);
        console.log(`File "${objectName}" uploaded to bucket "${bucketName}"`);
        return { success: true };
    }
    catch (error) {
        console.error(`Failed to upload "${objectName}" to bucket "${bucketName}":`, error);
        return { success: false, error };
    }
};
export async function deleteFile(bucketName, objectName) {
    try {
        await minio.removeObject(bucketName, objectName);
        console.log(`File "${objectName}" removed from bucket "${bucketName}"`);
        return { success: true };
    }
    catch (error) {
        console.error(`Failed to delete "${objectName}" from bucket "${bucketName}":`, error);
        return { success: false, error };
    }
}
export async function renameFile(bucketName, oldName, newName) {
    try {
        // Copy object to new name
        await minio.copyObject(bucketName, newName, // new object key
        `${bucketName}/${oldName}` // source path
        );
        // Delete the old object
        await minio.removeObject(bucketName, oldName);
        console.log(`Renamed "${oldName}" to "${newName}" in bucket "${bucketName}"`);
        return { success: true };
    }
    catch (error) {
        console.error(`Failed to rename "${oldName}" to "${newName}" in bucket "${bucketName}":`, error);
        return { success: false, error };
    }
}
//# sourceMappingURL=minio.js.map