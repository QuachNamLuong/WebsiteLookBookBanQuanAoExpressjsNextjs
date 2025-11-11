import type { Request, Response } from "express";
import { createOrderFromCart } from "./order.service";
import { StatusCodes } from "http-status-codes";

export const createOrderFromCartHandler = async (req: Request, res: Response) => {
    const {cartId} = req.body;

    const order = await createOrderFromCart(cartId);

    res.status(StatusCodes.CREATED).json(order);
};

export const getOrderOfCustomer = async (req: Request, res: Response) => {
    const {userId} = req.params;

    res.status(StatusCodes.OK).json();
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    const {orderId, orderStatus} = req.body;

    res.status(StatusCodes.OK).json();
};