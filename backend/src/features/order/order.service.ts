import { StatusCodes } from "http-status-codes";
import prisma from "../../lib/prisma";
import { AppError } from "../../types/app.d";

import { Prisma } from '@prisma/client';

export const createOrderFromCart = async (cartId: string) => {
    try {
        const cartDetail = await prisma.cart.findUnique({
            where: { id: cartId },
            include: {
                cartItems: {
                    include: { product: true }
                }
            }
        });

        if (!cartDetail) {
            throw new AppError(
                100,
                "Cart not found",
                "Cart not found",
                StatusCodes.NOT_FOUND
            );
        }

        const orderTotalPrice = cartDetail.cartItems.reduce((accumulator, item) => { return accumulator + (Number(item.product.price) * item.quantity); }, 0);

        const order = await prisma.$transaction(async (tx) => {
            const createdOrder = await tx.order.create({
                data: {
                    userId: cartDetail.userId,
                    orderTotalPrice
                }
            });

            const orderItems = cartDetail.cartItems.map((item) => ({
                orderItemQuantity: item.quantity,
                orderItemUnitPrice: item.product.price,
                productId: item.productId,
                orderId: createdOrder.orderId
            }));

            await tx.orderItem.createMany({ data: orderItems });

            return createdOrder;
        });

        return order;
    } catch (error) {
        if (error instanceof AppError) throw error;

        throw new AppError(
            500,
            "Order creation failed",
            "Unexpected error",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
};
