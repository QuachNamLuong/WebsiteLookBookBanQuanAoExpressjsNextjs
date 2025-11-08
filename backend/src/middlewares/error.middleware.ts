import express from "express";
import logger from "../utils/logger";
import { AppError } from "../types/app.d";

export const errorHandler = (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
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
