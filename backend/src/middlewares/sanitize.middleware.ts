import type { Request, Response, NextFunction } from "express";
import xss from "xss";

function sanitizeObject(obj: Record<string, any>) {
  const stack = [obj];

  while (stack.length > 0) {
    const current = stack.pop();

    for (const key in current) {
      const value = current[key];

      if (typeof value === "string") {
        current[key] = xss(value);
      } else if (typeof value === "object" && value !== null) {
        stack.push(value);
      }
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
