import type { Request, Response } from "express";
import { addProductToCart, getCartDetail } from "./cart.service";
import { StatusCodes } from "http-status-codes";
import type { GetCartDetailParamsSchema } from "./cart.schema";

export const getCartDetailHandler = async (req: Request, res: Response) => {
  const { userId } = req.params as GetCartDetailParamsSchema;

  const cartDetail = await getCartDetail(userId);

  res.status(StatusCodes.OK).json(cartDetail);
};

export const addProductToCartHandler = async (req: Request, res: Response) => {
  const {userId, productId} = req.body;

  const cartItem = await addProductToCart(userId, productId);

  res.status(StatusCodes.OK).json(cartItem);
};