import jwt, { type JwtPayload } from 'jsonwebtoken';
import jwtConfig from '../config/jwt.config';
import logger from './logger';

export interface AccessJwtPayload extends JwtPayload {
  userId: string;
}

export interface RefreshJwtPayload extends JwtPayload {
  userId: string;
}

export const signAccessToken = (payload: AccessJwtPayload): string => {
  try {
    return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  } catch (err) {
    logger.error("Error signing access token:", err);
    throw new Error("Failed to sign access token");
  }
};

export const signRefreshToken = (payload: RefreshJwtPayload): string => {
  try {
    return jwt.sign(payload, jwtConfig.refreshSecret, {
      expiresIn: jwtConfig.refreshExpiresIn,
    });
  } catch (err) {
    logger.error("Error signing refresh token:", err);
    throw new Error("Failed to sign refresh token");
  }
};

export const verifyAccessToken = (token: string): AccessJwtPayload => {
  try {
    return jwt.verify(token, jwtConfig.secret) as AccessJwtPayload;
  } catch (err) {
    logger.error("Invalid access token:", err);
    throw new Error("Invalid or expired access token");
  }
};

export const verifyRefreshToken = (token: string): RefreshJwtPayload => {
  try {
    return jwt.verify(token, jwtConfig.refreshSecret) as RefreshJwtPayload;
  } catch (err) {
    logger.error("Invalid refresh token:", err);
    throw new Error("Invalid or expired refresh token");
  }
};
