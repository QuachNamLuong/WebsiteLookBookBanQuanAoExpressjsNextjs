import { Router } from "express";
import { getProductByIdHandler } from "./handler";
import { validateRequest } from "middlewares/validate-request.middleware";
import { getProductByIdParamsSchema } from "./schema";

const createProductRoute = Router();

createProductRoute.post(
  "/get-product-by-id/:productId",
  validateRequest(getProductByIdParamsSchema, "params"),
  getProductByIdHandler
);

export default createProductRoute;