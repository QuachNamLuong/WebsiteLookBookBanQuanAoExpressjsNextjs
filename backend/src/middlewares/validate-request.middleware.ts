import { ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../types/app.d";
import { StatusCodes } from "http-status-codes";
import logger from "../utils/logger";

export const validateRequest = (schema: ZodType, source: "body" | "query" | "cookies" | "params" = "body") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync(req[source]);

    if (!result.success) {
      logger.error(result.error);
      throw new AppError(
        1002,
        `Request ${source} validation failed`,
        "Invalid request data",
        StatusCodes.BAD_REQUEST
      );
    }

    (req as any)[source] = result.data;
    next();
  };
};
