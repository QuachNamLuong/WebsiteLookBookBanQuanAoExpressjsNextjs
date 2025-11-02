import { StatusCodes } from "http-status-codes";
import { ClientMessage } from "../constants/error";
import prisma from "../lib/prisma";
import { AppError } from "../types/app";

export const addCartItem = async (userId: string, productId: string) => {
  const cartItem = await prisma.cartItem.create({
    data: {
      product: { connect: { productId } },
      user: { connect: { userId } },
      quantity: 1,
    },
    include: {
      product: true,
    },
  });

  return cartItem;
};

export const updateCartItemQuantity = async (cartItemId: string, quantity: number) => {
  if (quantity < 1) {
    throw new AppError(
      1,
      'Quantity must be at least 1',
      ClientMessage.SERVER_ERROR,
      StatusCodes.BAD_REQUEST
    );
  }

  const cartItem = await prisma.cartItem.findUnique({ where: { id: cartItemId } });
  if (!cartItem) throw new AppError(1, `cart_item with id is ${cartItemId} not found`, ClientMessage.SERVER_ERROR, StatusCodes.BAD_REQUEST);

  const updatedCartItem = await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
    include: { product: true },
  });
};