import { z } from "zod";

export const getCartDetailParamsSchema = z.object({
  userId: z.uuid(),
});

export type GetCartDetailParamsSchema = z.infer<typeof getCartDetailParamsSchema>;