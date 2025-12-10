import { Router } from "express";
import { getProductByIdHandler } from "./handler";
import { validateRequest } from "middlewares/validate-request.middleware";
import { getProductByIdParamsSchema } from "./schema";

const getProductByIdRoute = Router();

getProductByIdRoute.get(
  "/:productId",
  validateRequest(getProductByIdParamsSchema, "params"),
  getProductByIdHandler
);

export default getProductByIdRoute;