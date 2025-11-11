import type { Request, Response } from "express";
import { addProductToCart, changeProductQuantity, getCartDetail, removeProductInActiveCart } from "./cart.service";
import { StatusCodes } from "http-status-codes";
import type { ChangeProductInActiveCartParamsSchema, GetCartDetailParamsSchema, RemoveProductInActiveCartParamsSchema } from "./cart.schema";

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


export const removeProducInActiveCartHandler = async (req: Request, res: Response) => {
  const {userId, productId} = req.params as RemoveProductInActiveCartParamsSchema;

  const cartItem = await removeProductInActiveCart(userId, productId);

  res.status(StatusCodes.OK).json(cartItem);
};

export const changeProductQuantityHandler = async (req: Request, res: Response) => {
  const {userId, productId, quantity} = req.body as ChangeProductInActiveCartParamsSchema;

  const cartItem = await changeProductQuantity(userId, productId, quantity);

  res.status(StatusCodes.OK).json(cartItem);
};