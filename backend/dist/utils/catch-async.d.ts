import type { Request, Response, NextFunction } from "express";
export declare const catchAsync: (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=catch-async.d.ts.map