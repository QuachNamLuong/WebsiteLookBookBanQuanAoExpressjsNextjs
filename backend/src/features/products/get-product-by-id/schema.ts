import { z } from 'zod';

export const getProductByIdParamsSchema = z.object({
  productId: z.number()
});

export type GetProductByIdParamsSchema = z.infer<typeof getProductByIdParamsSchema>;

export const getProductByIdResponseSchema = z.object({
  product: z.object({
    id: z.number(),
    name: z.string(),
    code: z.string()
  })
});

export type GetProductByIdResponseSchema = z.infer<typeof getProductByIdResponseSchema>;
