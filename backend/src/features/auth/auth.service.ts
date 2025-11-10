import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../utils/jwt";
import logger from "../../utils/logger";
import * as AuthHelper from "../../helpers/auth.helper";
import * as UserService from "../../services/user.service";
import prisma from "../../lib/prisma";
import { comparePassword } from "../../utils/password";

export const registerCustomer = async (username: string, email: string, password: string) => {
  await AuthHelper.checkUsenameExits(username);
  await AuthHelper.checkEmailExits(email)
  const user = await UserService.createCustomerUser(username, email, password);

  const accessToken = signAccessToken({
    userId: user.userId,
    username: user.username,
    email: user.email,
    role: user.role,
  });

  const refreshToken = signRefreshToken({ userId: user.userId });

  logger.info(`User registered: ${user.email}`);

  return {
    user: {
      id: user.userId,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};


export const login = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new Error("Username or password not correct");

  const isPasswordCorrect = await comparePassword(password, user.passwordHash);
  if (!isPasswordCorrect) throw new Error("Username or password not correct");


  const accessToken = signAccessToken({
    userId: user.userId,
    username: user.username,
    email: user.email,
    role: user.role,
  });

  const refreshToken = signRefreshToken({ userId: user.userId });

  logger.info(`User login: ${user.email}`);

  return {
    user: {
      id: user.userId,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

export const refreshTokens = async (refreshToken: string) => {
  try {
    const decoded = verifyRefreshToken(refreshToken);
    const userId = decoded.userId;

    const user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      logger.warn(`Refresh attempt for non-existent user: ${userId}`);
      throw new Error("User no longer exists");
    }

    const newAccessToken = signAccessToken({
      userId: user.userId,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    const newRefreshToken = signRefreshToken({ userId: user.userId });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (err) {
    logger.error("Failed to refresh tokens:", err);
    throw new Error("Invalid or expired refresh token");
  }
};

