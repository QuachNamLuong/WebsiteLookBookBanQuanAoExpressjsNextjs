import express from "express";
import logger from "../utils/logger";
import { AppError } from "../types/app.d";
export const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        logger.error(err.internalMessage);
        return res.status(err.statusCode).json({
            errorCode: err.errorCode,
            message: err.clientMessage,
        });
    }
    console.error(err);
    return res.status(500).json({
        errorCode: 0,
        message: "SERVER_ERROR",
    });
};
//# sourceMappingURL=error.middleware.js.map