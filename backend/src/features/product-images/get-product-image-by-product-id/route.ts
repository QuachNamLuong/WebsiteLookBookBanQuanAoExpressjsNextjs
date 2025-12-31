import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "lib/prisma";
import { catchAsync } from "utils/catch-async";

const getProductImageByProductId = Router();

getProductImageByProductId.get("/:productId", catchAsync(async (req, res) => {
  const {productId} = req.params;

  const productImage = await prisma.productImage.findFirst({where: {productId: Number(productId)}});

  res.status(StatusCodes.OK).json(productImage);
}));

export default getProductImageByProductId;