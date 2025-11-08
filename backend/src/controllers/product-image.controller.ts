import type { Request, Response } from "express";
import { getProductImagesByProductId } from "../services/product-image.service";
import { AppError } from "../types/app.d";

export const getProductImagesByProductIdHandler = async (req: Request, res: Response) => {
  const { productId } = req.params;
  if (!productId) throw new AppError(100, "", "", 500);
  const productImages = await getProductImagesByProductId(productId);
  res.status(200).json({ productImages });
};