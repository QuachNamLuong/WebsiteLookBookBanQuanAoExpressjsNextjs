import { Router } from "express";
import { getCartDetailParamsSchema } from "./cart.schema";
import { validateRequest } from "../../middlewares/validate-request.middleware";
import { catchAsync } from "../../utils/catch-async";
import { addProductToCartHandler, getCartDetailHandler } from "./cart.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const cartRoutes = Router();

cartRoutes.get(
  "/cart/:userId",
  validateRequest(getCartDetailParamsSchema, "params"),
  catchAsync(getCartDetailHandler)
);

cartRoutes.post(
  "/cart",
  authenticate,
  catchAsync(addProductToCartHandler)
);

export default cartRoutes;