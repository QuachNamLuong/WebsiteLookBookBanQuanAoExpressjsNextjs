import { Router } from "express";
import * as AuthController from "./auth.controller";
import { catchAsync } from "../../utils/catch-async";
import { authenticate } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validate-request.middleware";
import { loginRequestSchema, refreshTokenRequestSchema, registerRequestSchema } from "./auth.schema";

const authRouter = Router();

authRouter.post(
  "/auth/login", 
  validateRequest(loginRequestSchema, "body"), 
  catchAsync(AuthController.loginHandler)
);

authRouter.post(
  "/auth/register", 
  validateRequest(registerRequestSchema, "body"),
  catchAsync(AuthController.registerHandler)
);

authRouter.post(
  "/auth/refresh-token", 
  validateRequest(refreshTokenRequestSchema, "cookies"), 
  catchAsync(AuthController.refreshTokenHandler)
);

authRouter.get(
  "/auth/me",
  authenticate,
  catchAsync(AuthController.getMeHandler)
);

authRouter.post(
  "/auth/logout",
  authenticate,
  catchAsync(AuthController.logoutHandler)
);

export default authRouter;