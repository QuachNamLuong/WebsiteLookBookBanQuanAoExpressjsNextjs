import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "lib/prisma";
import { authenticate } from "middlewares/auth.middleware";
import type { AuthenticatedRequest } from "types/express";
import { catchAsync } from "utils/catch-async";

const getNumberOfCartItem = Router()

getNumberOfCartItem.get("/", authenticate, catchAsync(async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;

  const countCartItem = await prisma.cartItem.count({ where: { cart: { userId: Number(userId) } } });
  
  res.status(StatusCodes.OK).json({countCartItem});
}));

export default getNumberOfCartItem;