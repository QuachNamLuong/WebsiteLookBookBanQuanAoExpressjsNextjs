import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma";
import { AppError } from "../types/app.d";

export const addProductToCart = async (userId: string, productId: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { userId } });
    if (!user) {
      throw new AppError(
        1001,
        `User not found: ${userId}`,
        "User not found",
        StatusCodes.NOT_FOUND
      );
    }

    const product = await prisma.product.findUnique({ where: { productId } });
    if (!product) {
      throw new AppError(
        1002,
        `Product not found: ${productId}`,
        "Product not found",
        StatusCodes.NOT_FOUND
      );
    }

    let cart = await prisma.cart.findFirst({
      where: { userId, isActive: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
          isActive: true,
        },
      });
    }

    // Check if product is already in cart — if yes, increase quantity
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (existingItem) {
      return await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + 1 },
      });
    }

    // Otherwise, create a new item
    const newCartItem = await prisma.cartItem.create({
      data: {
        quantity: 1,
        cart: { connect: { id: cart.id } },
        product: { connect: { productId } },
      },
    });

    return newCartItem;
  } catch (error: any) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1003,
      `Database error while adding product ${productId} to user ${userId}'s cart: ${error.message}`,
      "Unable to add product to cart",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const updateCartItemQuantity = async (cartItemId: string, quantity: number) => {
  if (quantity < 1) {
    throw new AppError(
      1,
      'Quantity must be at least 1',
      "ClientMessage.SERVER_ERROR",
      StatusCodes.BAD_REQUEST
    );
  }

  const cartItem = await prisma.cartItem.findUnique({ where: { id: cartItemId } });
  if (!cartItem) throw new AppError(1, `cart_item with id is ${cartItemId} not found`, " ClientMessage.SERVER_ERROR", StatusCodes.BAD_REQUEST);

  const updatedCartItem = await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
    include: { product: true },
  });
};

export const getCartDetailByUserId = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { userId },
    });
    if (!user) throw new AppError(1001, "User not found", "", 404);

    const cartDetail = await prisma.cart.findFirst({
      where: { userId, isActive: true },
      include: { cartItems: true },
    });
    if (!cartDetail) throw new AppError(1002, "Active cart not found", "", 404);

    return cartDetail;
  } catch (error: any) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      5001,
      `Error when getting cart detail: ${error.message ?? error}`,
      "Internal server error",
      500
    );
  }
};
