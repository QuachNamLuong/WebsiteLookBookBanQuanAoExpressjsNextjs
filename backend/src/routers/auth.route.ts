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
  catchAsync((req, res): any => {
    const userReq = req as AuthenticatedRequest;
    res.json({ user: { userId: userReq.userId } });
  })
);

authRouter.post("/auth/logout", (req, res) => {

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });

  return res.status(200).json({ message: "Logged out successfully" });
});

export default authRouter;