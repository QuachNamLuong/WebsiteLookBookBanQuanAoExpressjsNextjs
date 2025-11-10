import multer from "multer";
import type { Product, Size } from "../generated/prisma";
import prisma from "../lib/prisma";
import logger from "../utils/logger";
import { deleteFile, ensurePublicBucket, uploadFile } from "../utils/minio";
import { v4 as uuidv4 } from "uuid";
import minioConfig from "../config/minio.config";
import { ca } from "zod/locales";
import { AppError } from "../types/app.d";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

const PRODUCT_IMAGE_BUCKET = "product-images";
ensurePublicBucket(PRODUCT_IMAGE_BUCKET);

export const createProduct = async (
  productName: string,
  price: number,
  quantity: number,
  files: Express.Multer.File[],
  sizes: Size[],
  nameMean: string,
  material: string,
  style: string,
  color: string,
  usage: string
) => {
  const existingProduct = await prisma.product.findFirst({
    where: {
      productName,
    },
  });

  if (existingProduct) {
    throw new AppError(100, "Product already exists", "", 400);
  }

  return await prisma.$transaction(async (tx) => {
    const product = await tx.product.create({
      data: {
        productName,
        price,
        quantity,
        color,
        material,
        nameMeaning: nameMean,
        style,
        usage,
        productSizes: {
          connect: sizes.map((s) => ({ size: s })),
        },
      },
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

export const updateProduct = async (
  productId: string,
  productName: string,
  price: number,
  quantity: number,
  files: Express.Multer.File[],
  fileToDelete: string[],
  sizes: Size[],
  nameMean: string,
  material: string,
  style: string,
  color: string,
  usage: string
) => {
  const productUpdated = await prisma.$transaction(async (tx) => {
    // 1️⃣ Find the product's current sizes
    const currentProduct = await tx.product.findUnique({
      where: { productId },
      include: { productSizes: { select: { size: true } } },
    });

    const currentSizes = currentProduct?.productSizes.map((s) => s.size) || [];

    // 2️⃣ Find sizes that already exist globally
    const existingSizes = await tx.productSize.findMany({
      where: { size: { in: sizes } },
      select: { size: true },
    });

    const existingSizeNames = existingSizes.map((s) => s.size);

    // 3️⃣ Separate sizes to create, connect, and disconnect
    const newSizes = sizes.filter((s) => !existingSizeNames.includes(s));
    const toConnect = existingSizeNames.map((s) => ({ size: s }));
    const toCreate = newSizes.map((s) => ({ size: s }));
    const toDisconnect = currentSizes
      .filter((s) => !sizes.includes(s))
      .map((s) => ({ size: s }));

    // 4️⃣ Update product
    const productUpdated = await tx.product.update({
      where: { productId },
      data: {
        productName,
        price,
        quantity,
        color,
        material,
        nameMeaning: nameMean,
        style,
        usage,
        productSizes: {
          connect: toConnect,
          create: toCreate,
          disconnect: toDisconnect,
        },
      },
      include: {
        productSizes: true,
      },
    });

    return productUpdated;
  });
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

export const deleteProdcut = async (productId: string) => {
  try {
    const { productImages } = await prisma.$transaction(async (tx) => {
      const productImages = await tx.productImage.findMany({
        where: { productId },
      });

      await tx.productImage.deleteMany({
        where: { productId },
      });

      const deletedProduct = await tx.product.delete({
        where: { productId },
      });

      return { productImages };
    });

    for (const image of productImages) {
      try {
        await deleteFile(PRODUCT_IMAGE_BUCKET, image.objectName);
      } catch (err) {
        logger.warn(`Failed to delete image ${image.objectName}:`, err);
      }
    }
  }
  catch (e) {
    throw new AppError(100, "Can not delete product", "", 400);
    logger.error(e)
  }
};

export const getPaginatedProducts = async (page: number = 1, limit: number = 10) => {
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

export const getProductDetailById = async (productId: string) => {
  try {
    const productDetail = await prisma.product.findUnique({
      where: { productId },
      include: { productImage: true, productSizes: true },
    });
    return productDetail;
  } catch (e) {
    logger.error(e)
  }
}