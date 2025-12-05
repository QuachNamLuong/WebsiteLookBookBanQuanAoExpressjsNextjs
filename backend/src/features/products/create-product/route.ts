import { Router } from "express";
import { createProductHandler } from "./handler";
import { validateRequest } from "middlewares/validate-request.middleware";
import { createProductBodySchema } from "./schema";

const createProductRoute = Router();

createProductRoute.post(
  "/", 
  validateRequest(createProductBodySchema, "body"),
  createProductHandler
);

export default createProductRoute;