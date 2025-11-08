import type { Request, Response } from "express";
import * as CartService from "../services/cart.service";
import { AppError } from "../types/app.d";
import { StatusCodes } from "http-status-codes";


export const addProductToCartHandler = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    throw new AppError(
      1001,
      "Missing required fields: userId or productId",
      "Invalid request data",
      StatusCodes.BAD_REQUEST
    );
  }

  const cartItem = await CartService.addProductToCart(userId, productId);

  if (!cartItem) {
    throw new AppError(
      1002,
      `Failed to add product ${productId} to cart for user ${userId}`,
      "Unable to add product to cart",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  res.status(StatusCodes.OK).json({
    message: "Product added to cart successfully",
    data: cartItem,
  });
};

export const getCartDetailHandler = async (req: Request, res: Response) =>  {
  
};