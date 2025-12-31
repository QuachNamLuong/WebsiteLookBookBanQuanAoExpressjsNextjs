import { Prisma } from "@generated/prisma/client";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "lib/prisma";
import { authenticate } from "middlewares/auth.middleware";
import type { AuthenticatedRequest } from "types/express";
import { catchAsync } from "utils/catch-async";

const removeCartItemRoute = Router()

removeCartItemRoute.delete("/:productId", authenticate, catchAsync(async (req: AuthenticatedRequest, res) => {
  const userId = Number(req.userId);
  const productId = Number(req.params.productId);

  const result = await prisma.$transaction(async (tx) => {
    const cartItem = await tx.cartItem.findFirst({
      where: {
        productId,
      }, include: { product: true , cart: true}
    });
    const result = await tx.cartItem.deleteMany({
      where: {
        productId,
        cart: {
          userId,
        },
      },
    });
    tx.cart.update({ where: { userId: Number(userId) }, data: { total: Prisma.Decimal(cartItem?.cart.total??0).minus(cartItem?.product.price ?? 0) }, });
    return result

  })

  if (result.count === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Cart item not found" });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    deleted: result.count,
  });
}));

export default removeCartItemRoute;