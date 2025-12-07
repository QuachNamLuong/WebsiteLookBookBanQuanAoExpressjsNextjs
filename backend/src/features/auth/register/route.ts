import { Router } from "express";
import { catchAsync } from "utils/catch-async";
import { registerHandler } from "./handler";
import { validateRequest } from "middlewares/validate-request.middleware";
import { registerBodySchema } from "./schema";

const registerRoute = Router();

registerRoute.post(
  "/register",
  validateRequest(registerBodySchema, "body"),
  catchAsync(registerHandler)
);

export default registerRoute;