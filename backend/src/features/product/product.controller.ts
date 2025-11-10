import type { Request, Response } from "express";
import * as ProductServices from "./product.service";
import logger from "../../utils/logger";
import type { Size } from "../../generated/prisma";

export const createProductHandler = async (req: Request, res: Response) => {
  try {
    const {
      productName,
      price,
      quantity,
      sizes,
      nameMean,
      material,
      style,
      color,
      usage
    } = req.body;

    if (!productName || !price || !quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const files = req.files as Express.Multer.File[] || [];

    const productId = await ProductServices.createProduct(
      productName,
      Number(price),
      Number(quantity),
      files,
      sizes as Size[],
      nameMean,
      material,
      style,
      color,
      usage
    );

    res.status(201).json({
      productId,
      message: "Product created successfully",
      // images, // có thể trả về URL ảnh nếu cần
    });
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const getPaginateProductHandler = async (req: Request, res: Response) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
  const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;

  const paginateProduct = await ProductServices.getPaginatedProducts(page, limit);
  res.status(200).json(paginateProduct);
};

export const deleteProductByIdHandler = async (req: Request, res: Response) => {
  const { productId } = req.params;
  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  await ProductServices.deleteProdcut(productId);

  return res.status(200).json("deleteed");
};

export const getProductDetailByIdHandler = async (req: Request, res: Response) => {
  const { productId } = req.params;
  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }
  const productDetail = await ProductServices.getProductDetailById(productId);
  if (!productDetail) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.status(200).json(productDetail);
};

export const updateProductHandler = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { 
      productName, 
      price, 
      quantity, 
      deletedImages, 
      sizes,
      nameMean,
      material,
      style,
      color,
      usage } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Normalize deletedImages → always an array
    const deletedImagesArray =
      deletedImages
        ? Array.isArray(deletedImages)
          ? deletedImages
          : [deletedImages]
        : [];

    // Files uploaded via multer
    const files = (req.files as Express.Multer.File[]) || [];

    logger.info(`🧹 Files to delete: ${JSON.stringify(deletedImagesArray)}`);
    logger.info(`🖼️ Uploaded files: ${files.map(f => f.originalname).join(", ")}`);

    const updatedProduct = await ProductServices.updateProduct(
      productId,
      productName,
      Number(price),
      Number(quantity),
      files,
      deletedImagesArray,
      sizes,
      nameMean,
      material,
      style,
      color,
      usage
    );

    return res.status(200).json(updatedProduct);
  } catch (err: any) {
    logger.error("❌ Error updating product:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};