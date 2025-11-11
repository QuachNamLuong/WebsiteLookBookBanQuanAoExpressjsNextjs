import { StatusCodes } from "http-status-codes";
import prisma from "../../lib/prisma";
import { AppError } from "../../types/app.d";
import { createActiveCart, getActiveCartByUserId, getCartItemHaveProduct, getOrCreateActiveCart, getUserById, removeCartItem, validateProduct, validateUser } from "./cart.helper";
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

export const removeProductInActiveCart = async (userId: string, productId: string) => {
  try {
    await validateUser(userId);
    await validateProduct(productId);

    const cart = await getOrCreateActiveCart(userId);
    const cartItemDeleted = await removeCartItem(cart.id, productId);
    return cartItemDeleted;
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1999,
      `Failed to remove productId=${productId} from cart for userId=${userId}. Internal error: ${error instanceof Error ? error.message : error}`,
      "We ran into a problem while removing the item from your cart. Please try again shortly.",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const changeProductQuantity = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  try {
    if (quantity < 1) {
      throw new AppError(
        1999,
        `Invalid quantity=${quantity} for productId=${productId} in cart for userId=${userId}. Quantity must be at least 1.`,
        "Quantity must be at least 1 to update your cart.",
        StatusCodes.BAD_REQUEST
      );
    }

    await validateUser(userId);
    await validateProduct(productId);

    const cart = await getOrCreateActiveCart(userId);

    const cartItem = await prisma.cartItem.update({
      where: { cartId_productId: { cartId: cart.id, productId } },
      data: { quantity },
    });

    return cartItem;
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1999,
      `Failed to update quantity=${quantity} for productId=${productId} in cart for userId=${userId}. Internal error: ${error instanceof Error ? error.message : error}`,
      "We encountered an issue while updating your cart. Please try again later.",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

