import { z } from "zod";

export const refreshTokenRequestSchema = z.object({
  refreshToken: z.string(),
});

export type RefreshTokenRequestSchema = z.infer<typeof refreshTokenRequestSchema>;

export const registerRequestSchema = z.object({
  email: z.email(),
  username: z.string(),
  password: z.string().min(6),
});

export type RegisterRequestSchema = z.infer<typeof registerRequestSchema>;

export const loginRequestSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
});

export type LoginRequestSchema = z.infer<typeof loginRequestSchema>;

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: z.object({
    userId: z.string(),
    email: z.email(),
  }),
});

export type LoginResponseSchema = z.infer<typeof loginResponseSchema>;

export const getMeResponseSchema = z.object({
  user: z.object({
    userId: z.string(),
  }),
});

export type GetMeResponseSchema = z.infer<typeof getMeResponseSchema>;

export const logoutResponseSchema = z.object({
  message: z.string(),
});

export type LogoutResponseSchema = z.infer<typeof logoutResponseSchema>;