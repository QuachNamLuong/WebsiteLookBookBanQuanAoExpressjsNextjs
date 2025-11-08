import { Router } from "express";
import { catchAsync } from "../utils/catch-async";
import * as CartController from "../controllers/cart.controller";

const cartRouter = Router();

cartRouter.post("/cart", catchAsync(CartController.addProductToCartHandler))

export default cartRouter;