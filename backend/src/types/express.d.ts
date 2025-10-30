import type { Role } from "../generated/prisma";
import type { Request } from "express";

export interface AuthUser {
  userId: string,
  role: Role
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
  cookies: {
    accessToken?: string;
    refreshToken?: string;
  };
}