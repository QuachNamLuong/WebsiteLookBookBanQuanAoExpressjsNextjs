import type { Response, Request } from "express";
import logger from "../utils/logger";
import AuthSerivce from "../services/auth.service";
import { verifyRefreshToken } from "../utils/jwt";
import appConfig from "../config/app.config";
import jwtConfig from "../config/jwt.config";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

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


export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

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

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

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

