import multer from "multer";
import prisma from "../lib/prisma";
import logger from "../utils/logger";
import { deleteFile, ensurePublicBucket, uploadFile } from "../utils/minio";
import { v4 as uuidv4 } from "uuid";
import minioConfig from "../config/minio.config";
import { ca } from "zod/locales";
const storage = multer.memoryStorage();
export const upload = multer({ storage });
const PRODUCT_IMAGE_BUCKET = "product-images";
ensurePublicBucket(PRODUCT_IMAGE_BUCKET);
export const createProduct = async (productName, price, quantity, files) => {
    return await prisma.$transaction(async (tx) => {
        // 1️⃣ Create product record
        const product = await tx.product.create({
            data: { productName, price, quantity },
        });
        logger.info(`files length: ${files.length}`);
        if (files && files.length > 0) {
            const imagesData = [];
            for (const file of files) {
                const ext = file.originalname.includes(".")
                    ? file.originalname.split(".").pop()
                    : "bin";
                const objectName = `${uuidv4()}.${ext}`;
                // Upload file to MinIO
                await uploadFile(PRODUCT_IMAGE_BUCKET, objectName, file.buffer);
                imagesData.push({
                    productId: product.productId,
                    productImageUrl: `http://${minioConfig.endPoint}:${minioConfig.port}/${PRODUCT_IMAGE_BUCKET}/${objectName}`,
                    productImageName: product.productName + `_${Date.now()}`,
                    objectName: objectName,
                });
            }
            // 2️⃣ Create product images in DB
            await tx.productImage.createMany({ data: imagesData });
        }
        return product.productId;
    });
};
export const updateProduct = async (productId, productName, price, quantity, files, fileToDelete) => {
    const productUpdated = await prisma.product.update({ where: { productId }, data: { productName, price, quantity } });
    if (!productUpdated) {
        throw new Error("Product not found");
    }
    if (files && files.length > 0) {
        const imagesData = [];
        for (const file of files) {
            const ext = file.originalname.includes(".")
                ? file.originalname.split(".").pop()
                : "bin";
            const objectName = `${uuidv4()}.${ext}`;
            await uploadFile(PRODUCT_IMAGE_BUCKET, objectName, file.buffer);
            imagesData.push({
                productId: productId,
                productImageUrl: `http://${minioConfig.endPoint}:${minioConfig.port}/${PRODUCT_IMAGE_BUCKET}/${objectName}`,
                productImageName: productName + `_${Date.now()}`,
                objectName: objectName,
            });
        }
        await prisma.productImage.createMany({ data: imagesData });
    }
    for (const file of fileToDelete) {
        await deleteFile(PRODUCT_IMAGE_BUCKET, file);
        await prisma.productImage.delete({ where: { objectName: file } });
    }
};
export const deleteProdcut = async (productId) => {
    try {
        const newProduct = await prisma.product.delete({ where: { productId } });
    }
    catch (e) {
        logger.error(e);
    }
};
export const getPaginatedProducts = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
        prisma.product.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: { productImage: true },
        }),
        prisma.product.count(),
    ]);
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    return {
        data: products,
        pagination: {
            total,
            totalPages,
            currentPage: page,
            hasNextPage,
        },
    };
};
export const getProductDetailById = async (productId) => {
    try {
        const productDetail = await prisma.product.findUnique({
            where: { productId },
            include: { productImage: true },
        });
        return productDetail;
    }
    catch (e) {
        logger.error(e);
    }
};
//# sourceMappingURL=product.service.js.map