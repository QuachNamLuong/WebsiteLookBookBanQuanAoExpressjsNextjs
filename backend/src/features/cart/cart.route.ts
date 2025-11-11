import { Router } from "express";
import { changeProductInActiveCartParamsSchema, getCartDetailParamsSchema, removeProductInActiveCartParamsSchema } from "./cart.schema";
import { validateRequest } from "../../middlewares/validate-request.middleware";
import { catchAsync } from "../../utils/catch-async";
import { addProductToCartHandler, changeProductQuantityHandler, getCartDetailHandler, removeProducInActiveCartHandler } from "./cart.controller";
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


cartRoutes.delete(
  "/cart/:userId/:productId",
  authenticate,
  validateRequest(removeProductInActiveCartParamsSchema, "params"),
  catchAsync(removeProducInActiveCartHandler)
);

cartRoutes.put(
  "/cart/change-product-quantity",
  authenticate,
  validateRequest(changeProductInActiveCartParamsSchema, "body"),
  catchAsync(changeProductQuantityHandler)
);


export default cartRoutes;