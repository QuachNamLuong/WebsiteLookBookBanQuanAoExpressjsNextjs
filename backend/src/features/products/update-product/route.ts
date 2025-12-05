import { Router } from "express";
import { updateProductHandler } from "./handler";
import { validateRequest } from "middlewares/validate-request.middleware";
import { updateProductBodySchema, updateProductParamsSchema } from "./schema";

const updateProductRoute = Router();

updateProductRoute.patch(
  "/update-product/:productId",
  validateRequest(updateProductParamsSchema, "params"),
  validateRequest(updateProductBodySchema, "body"),
  updateProductHandler
);

export default updateProductRoute;