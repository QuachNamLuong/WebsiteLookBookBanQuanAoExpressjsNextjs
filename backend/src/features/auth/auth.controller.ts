import type { Response, Request } from "express";
import logger from "../../utils/logger";
import * as AuthSerivce from "./auth.service";
import { verifyRefreshToken } from "../../utils/jwt";
import appConfig from "../../config/app.config";
import jwtConfig from "../../config/jwt.config";
import { getMeResponseSchema, logoutResponseSchema, type GetMeResponseSchema, type LoginRequestSchema, type LogoutResponseSchema, type RefreshTokenRequestSchema, type RegisterRequestSchema } from "./auth.schema";
import type { AuthenticatedRequest } from "./auth.types";
import { AppError } from "../../types/app.d";

export const registerHandler = async (req: Request, res: Response) => {

  const { username, email, password } = req.body as RegisterRequestSchema;

  const { accessToken, refreshToken } = await AuthSerivce.registerCustomer(
    username,
    email,
    password,
  );

  logger.info(`User registered: ${email}`);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: appConfig.mode === "production",
    sameSite: "strict",
    maxAge: jwtConfig.expiresIn
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: appConfig.mode === "production",
    sameSite: "strict",
    maxAge: jwtConfig.expiresIn
  });

  res.status(201).json({
    message: "User registered successfully",
  });
};


export const loginHandler = async (req: Request, res: Response) => {
  const { username, password } = req.body as LoginRequestSchema;

  const { accessToken, refreshToken } = await AuthSerivce.login(
    username,
    password,
  );
  logger.info(`User logged in: ${username}`);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: appConfig.mode === "production",
    sameSite: "strict",
    maxAge: jwtConfig.expiresIn
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: appConfig.mode === "production",
    sameSite: "strict",
    maxAge: jwtConfig.expiresIn
  });

  logger.info(`User logged in: ${username}`);

  res.json({
    message: "Login successful",
  });
};

export const refreshTokenHandler = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies as RefreshTokenRequestSchema;

  const decode = verifyRefreshToken(refreshToken);
  if (!decode) return res.status(401).json({
    message: "Invalid token"
  });

  const newAccessTokens = await AuthSerivce.refreshTokens(refreshToken);

  res.cookie("accessToken", newAccessTokens, {
    httpOnly: true,
    secure: appConfig.mode === "production",
    sameSite: "strict",
    maxAge: jwtConfig.expiresIn
  });
  logger.info("Access token refreshed");

  res.status(200).json({
    message: "Token refreshed successfully",
  });
};

export const getMeHandler = async (req: AuthenticatedRequest, res: Response) => {

  const response: GetMeResponseSchema = { user: { userId: req.userId! } };
  const validated = await getMeResponseSchema.safeParseAsync(response);

  if (!validated.success)
    throw new AppError(
      1001,
      "Response schema validation failed in getMe controller",
      "Internal server error",
      500
    );
  return res.json(validated.data);
};

export const logoutHandler = async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  const response: LogoutResponseSchema = { message: "Logged out successfully" };

  const validated = await logoutResponseSchema.safeParseAsync(response);
  if (!validated.success) {
    throw new AppError(
      1001,
      "Response schema validation failed in logout controller",
      "Internal server error",
      500
    );
  }

  return res.status(200).json(validated.data);
};