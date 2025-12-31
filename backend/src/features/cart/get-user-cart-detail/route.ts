import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "lib/prisma";
import { authenticate } from "middlewares/auth.middleware";
import type { AuthenticatedRequest } from "types/express";
import { catchAsync } from "utils/catch-async";
import { deflate } from "zlib";

const getUserCartDetailRoute = Router()

getUserCartDetailRoute.get("/user-cart", authenticate, catchAsync(async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;

  const cartDetail = await prisma.cart.findUnique({ where: { userId: Number(userId) }, include: { cartItems: { include: { product: { include: { productImage: true } } } } } })

  res.status(StatusCodes.OK).json(cartDetail);
}));

export default getUserCartDetailRoute;