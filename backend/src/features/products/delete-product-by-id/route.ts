import { Router } from "express";
import { deleteProductByIdHandler } from "./handler";
import { validateRequest } from "middlewares/validate-request.middleware";
import { deleteProductParamsSchema } from "./schema";

const createProductRoute = Router();

createProductRoute.delete(
  "/:productId",
  validateRequest(deleteProductParamsSchema, "params"),
  deleteProductByIdHandler
);

export default createProductRoute;