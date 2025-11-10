import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { catchAsync } from "../../utils/catch-async";
import { getUserProfileHandler } from "./user.controller";
import { validateRequest } from "../../middlewares/validate-request.middleware";
import { getUserProfileParamsSchema } from "./user.shema";

const userRoutes = Router();

userRoutes.get(
  "/user/get-user-profile/:userId", 
  authenticate,
  validateRequest(getUserProfileParamsSchema, "params"),
  catchAsync(getUserProfileHandler)
);

export default userRoutes;