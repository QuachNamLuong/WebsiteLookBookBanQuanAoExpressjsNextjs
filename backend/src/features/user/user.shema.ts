import { z } from "zod";

export const getUserProfileParamsSchema = z.object({
  userId: z.string(),
});

export type GetUserProfileParamsSchema = z.infer<typeof getUserProfileParamsSchema>;

