import { Router } from "express";
import { authenticate } from "middlewares/auth.middleware";
import { catchAsync } from "utils/catch-async";
import { refreshTokenHandler } from "./handler";
import { validateRequest } from "middlewares/validate-request.middleware";
import { refreshTokenRequestCookiesSchema } from "./schema";

const refreshTokenRoute = Router();

refreshTokenRoute.post(
  "/refresh-token",
  authenticate,
  validateRequest(refreshTokenRequestCookiesSchema, 'cookies'),
  catchAsync(refreshTokenHandler)
);

export default refreshTokenRoute;