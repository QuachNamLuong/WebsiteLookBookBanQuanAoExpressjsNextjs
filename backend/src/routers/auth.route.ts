import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";
import { catchAsync } from "../utils/catch-async";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import type { AuthenticatedRequest } from "../types/express";

const authRouter = Router();

authRouter.post("/auth/login", catchAsync(AuthController.login));
authRouter.post("/auth/register", catchAsync(AuthController.register));
authRouter.post("/auth/refresh-token", catchAsync(AuthController.refreshToken));
authRouter.get(
  "/auth/me",
  authenticate,
  catchAsync((req, res) => {
    const userReq = req as AuthenticatedRequest;
    res.json({ user: { userId: userReq.user?.userId } });
  })
);

export default authRouter;