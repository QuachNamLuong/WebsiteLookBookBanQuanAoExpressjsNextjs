import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { catchAsync } from "../../utils/catch-async";
import { createOrderFromCartHandler, getOrderOfCustomer, updateOrderStatus } from "./order.controller";

const orderRoutes = Router();

orderRoutes.post(
    "/order",
     authenticate,
      catchAsync(createOrderFromCartHandler)
    );

orderRoutes.get(
    "/order/get-user-orders/:userId",
    authenticate,
    catchAsync(getOrderOfCustomer)
);

orderRoutes.put(
    "/admin/order/update-order-status/:orderId",
    authenticate,
    authorize("ADMIN"),
    catchAsync(updateOrderStatus)
);

export default orderRoutes;