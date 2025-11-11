import { z } from "zod";

export const getCartDetailParamsSchema = z.object({
  userId: z.string(),
});

export type GetCartDetailParamsSchema = z.infer<typeof getCartDetailParamsSchema>;

export const removeProductInActiveCartParamsSchema = z.object({
  userId: z.string(),
  productId: z.string()
});

export type RemoveProductInActiveCartParamsSchema = z.infer<typeof removeProductInActiveCartParamsSchema>;

export const changeProductInActiveCartParamsSchema = z.object({
  userId: z.string(),
  productId: z.string(),
  quantity: z.number().min(1)
});

export type ChangeProductInActiveCartParamsSchema = z.infer<typeof changeProductInActiveCartParamsSchema>;

