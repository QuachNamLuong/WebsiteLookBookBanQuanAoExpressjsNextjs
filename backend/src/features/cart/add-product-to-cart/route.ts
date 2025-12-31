import { Prisma } from "@generated/prisma/client";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "lib/prisma";
import { authenticate } from "middlewares/auth.middleware";
import type { AuthenticatedRequest } from "types/express";
import { catchAsync } from "utils/catch-async";

const addProductToCartRoute = Router()

addProductToCartRoute.post("/:productId", authenticate, catchAsync(async (req: AuthenticatedRequest, res) => {
  const { productId } = req.params;
  const userId = Number(req.userId);

  const { cartId } = await prisma.$transaction(async (tx) => {
    let cart = await tx.cart.findUnique({ where: { userId: Number(userId) } });
    if (!cart) {
      cart = await tx.cart.create({ data: { userId: Number(userId) } });
    }
    let cartItem = await tx.cartItem.findFirst({ where: { cartId: cart.id, productId: Number(productId) }, include: { product: true } });
    if (!cartItem) {
      cartItem = await tx.cartItem.create({ data: { cartId: cart.id, productId: Number(productId) }, include: { product: true } });
      tx.cartItem.update({ where: { id: cartItem.id }, data: { quantity: cartItem.quantity + 1 }});
    }
    tx.cart.update({ where: { userId: Number(userId) }, data: { total: Prisma.Decimal(cart.total).add(cartItem.product.price) } });
    return { cartId: cart.id }

  })

  res.status(StatusCodes.NO_CONTENT).end();
}))

export default addProductToCartRoute;