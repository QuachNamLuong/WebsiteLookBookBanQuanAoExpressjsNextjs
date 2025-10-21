import type { Request, Response, NextFunction } from "express";
import xss from "xss";

function sanitizeObject(obj: Record<string, any>) {
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = xss(obj[key]);
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      sanitizeObject(obj[key]);
    }
  }
}

export const sanitizeMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.body) sanitizeObject(req.body);
  if (req.query) sanitizeObject(req.query);
  if (req.params) sanitizeObject(req.params);
  next();
};
