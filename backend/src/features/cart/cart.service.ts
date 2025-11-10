import { StatusCodes } from "http-status-codes";
import prisma from "../../lib/prisma";
import { AppError } from "../../types/app.d";
import { createActiveCart, getCartItemHaveProduct, getOrCreateActiveCart, getUserById, validateProduct, validateUser } from "./cart.helper";
import { updateCartItemQuantity } from "../../services/cart.service";

export const getCartDetail = async (userId: string) => {
  try {
    const user = await getUserById(userId);

    if (!user) {
      throw new AppError(1, "", "", StatusCodes.NOT_FOUND);
    }

    let cartDetail = await prisma.cart.findFirst({
      where: { userId, isActive: true },
      include: {
        cartItems: {
          include: {
            product: {
              include: {
                productImage: {
                  select: { productImageUrl: true },
                  take: 1,
                  orderBy: { createdAt: "asc" }
                }
              }
            }
          }
        }
      },
    });

    if (!cartDetail) {
      createActiveCart
    }

    return cartDetail;
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      100,
      `Unexpected server error while fetching cart for userId=${userId}: ${error instanceof Error ? error.message : error}`,
      "An unexpected error occurred while fetching cart details. Please try again later.",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const addProductToCart = async (userId: string, productId: string) => {
  try {
    await validateUser(userId);
    const product = await validateProduct(productId);
    const cart = await getOrCreateActiveCart(userId);
    const cartItem = await getCartItemHaveProduct(cart.id, productId);
    if (cartItem) {
      await updateCartItemQuantity(cartItem.id, cartItem.quantity + 1);
      return cartItem;
    }

    const newCartItem = await prisma.cartItem.create({
      data: {
        quantity: 1,
        cartId: cart.id,
        productId: product.productId,
      }
    });

    return newCartItem;

  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1999,
      `Unexpected server error while adding productId=${productId} to cart for userId=${userId}: ${error instanceof Error ? error.message : error}`,
      "An unexpected error occurred while updating your cart. Please try again later.",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};


