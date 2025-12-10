import { Router } from "express";
import { deleteProductByIdHandler } from "./handler";
import { validateRequest } from "middlewares/validate-request.middleware";
import { deleteProductParamsSchema } from "./schema";
import { authenticate, authorize } from "middlewares/auth.middleware";

const deleteProductByIdRoute = Router();

deleteProductByIdRoute.delete(
  "/:productId",
  authenticate,
  // authorize("ADMIN"),
  validateRequest(deleteProductParamsSchema, "params"),
  deleteProductByIdHandler
);

export default deleteProductByIdRoute;