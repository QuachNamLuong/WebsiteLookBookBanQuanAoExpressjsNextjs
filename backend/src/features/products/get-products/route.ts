import { Router } from "express";
import { getProductsHandler } from "./handler";
import { validateRequest } from "middlewares/validate-request.middleware";
import { getProductsQuerySchema } from "./schema";

const createProductRoute = Router();

createProductRoute.get(
  "/:productId",
  validateRequest(getProductsQuerySchema, "query"),
  getProductsHandler
);

export default createProductRoute;