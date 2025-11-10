import { StatusCodes } from "http-status-codes";
import prisma from "../../lib/prisma";
import { AppError } from "../../types/app.d";

export const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { userId },
  });
};

export const getUserCartActivated = async (userId: string) => {
  return await prisma.cart.findFirst({ where: { isActive: true, userId } });
};

export const createActiveCart = async (userId: string) => {
  const cartActive = await prisma.cart.create({
    data: {
      user: { connect: { userId } },
      isActive: true
    }
  });
  return cartActive;
};

export const createCartAndGetCartDetail = async (userId: string) => {
  return await prisma.cart.create({
    data: {
      isActive: true,
      userId
    },
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
    }
  });
};

export const getProductByProductId = async (productId: string) => {
  return await prisma.product.findUnique({ where: { productId } });
};

export const getActiveCartByUserId = async (userId: string) => {
  return await prisma.cart.findFirst({
    where: {
      userId,
      isActive: true,
    }
  });
};

export const createActiveCartForUser = (userId: string) => {
  return prisma.cart.create({
    data: {
      isActive: true,
      user: {
        connect: { userId }
      }
    },
  });
};

export const validateUser = async (userId: string) => {
  const user = await getUserById(userId);
  if (!user)
    throw new AppError(
      1000,
      `User with id=${userId} was not found`,
      "The specified user does not exist.",
      StatusCodes.NOT_FOUND
    );
  return user;
}

export const validateProduct = async (productId: string) => {
  const product = await getProductByProductId(productId);
  if (!product)
    throw new AppError(
      1001,
      `Product with id=${productId} was not found`,
      "The specified product does not exist.",
      StatusCodes.NOT_FOUND
    );

  return product;
}

export const getOrCreateActiveCart = async (userId: string) => {
  let cart = await getActiveCartByUserId(userId);
  if (!cart) cart = await createActiveCartForUser(userId);

  return cart;
};

export const getCartItemHaveProduct = (cartId: string, productId: string) => {
  return prisma.cartItem.findFirst({ where: { cartId, productId } });
};

export const changeQuantityOfProductInCart = async (cartItemId: string, quantity: number) => {
  if (quantity < 1)
    throw new AppError(
      1111,
      "quantity not valid",
      "",
      StatusCodes.BAD_REQUEST
    );

  const cartItem = await prisma.cartItem.update({ where: { id: cartItemId }, data: { quantity } });
  return cartItem;
}