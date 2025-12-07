import { Router } from "express";
import { catchAsync } from "utils/catch-async";
import { changePasswordHandler } from "./handler";
import { validateRequest } from "middlewares/validate-request.middleware";
import { changePasswordRequestBodySchema } from "./schema";
import { authenticate } from "middlewares/auth.middleware";

const changePasswordRoute = Router();

changePasswordRoute.post(
  "/change-password",
  authenticate,
  validateRequest(changePasswordRequestBodySchema, "body"),
  catchAsync(changePasswordHandler)
);

export default changePasswordRoute;