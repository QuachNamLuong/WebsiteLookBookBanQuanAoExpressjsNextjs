import type { NextFunction, Response } from "express";
import type { Role } from "../generated/prisma";
import type { AuthenticatedRequest } from "../types/express";
export declare const authenticate: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare const authorize: (...allowedRoles: Role[]) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auth.middleware.d.ts.map