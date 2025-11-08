import jwt, {} from 'jsonwebtoken';
import jwtConfig from '../config/jwt.config';
import logger from './logger';
export const signAccessToken = (payload) => {
    try {
        return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
    }
    catch (err) {
        logger.error("Error signing access token:", err);
        throw new Error("Failed to sign access token");
    }
};
export const signRefreshToken = (payload) => {
    try {
        return jwt.sign(payload, jwtConfig.refreshSecret, {
            expiresIn: jwtConfig.refreshExpiresIn,
        });
    }
    catch (err) {
        logger.error("Error signing refresh token:", err);
        throw new Error("Failed to sign refresh token");
    }
};
export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, jwtConfig.secret);
    }
    catch (err) {
        logger.error("Invalid access token:", err);
        throw new Error("Invalid or expired access token");
    }
};
export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, jwtConfig.refreshSecret);
    }
    catch (err) {
        logger.error("Invalid refresh token:", err);
        throw new Error("Invalid or expired refresh token");
    }
};
//# sourceMappingURL=jwt.js.map