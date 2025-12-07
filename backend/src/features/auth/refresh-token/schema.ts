import z from "zod";

export const refreshTokenRequestCookiesSchema = z.object({
  refreshToken: z.string()
});

export type RefreshTokenRequestCookiesSchema = z.infer<typeof refreshTokenRequestCookiesSchema>;