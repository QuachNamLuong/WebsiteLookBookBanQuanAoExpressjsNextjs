import { Router } from "express";
import { getProductsHandler } from "./handler";
import { validateRequest } from "middlewares/validate-request.middleware";
import { getProductsQuerySchema } from "./schema";

const getProductsRoute = Router();

getProductsRoute.get(
  "/get-products",
  validateRequest(getProductsQuerySchema, "query"),
  getProductsHandler
);

export default getProductsRoute;