import appConfig from "@config/app.config";
import jwtConfig from "@config/jwt.config";
import type { Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { AuthenticatedRequest } from "types/express";
import { signAccessToken, verifyRefreshToken } from "utils/jwt";
import type { RefreshTokenRequestCookiesSchema } from "./schema";

export async function refreshTokenHandler(req: AuthenticatedRequest, res: Response) {
  const { refreshToken } = req.cookies as RefreshTokenRequestCookiesSchema

  const { userId } = verifyRefreshToken(refreshToken);
  const accessToken = signAccessToken({ userId });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: appConfig.mode === "production",
    sameSite: "strict",
    maxAge: jwtConfig.expiresIn
  });

  res.status(StatusCodes.NO_CONTENT).end();
}