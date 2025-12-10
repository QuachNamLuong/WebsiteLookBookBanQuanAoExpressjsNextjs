import { z } from 'zod';

export const getProductByIdParamsSchema = z.object({
  productId: z.coerce.number()
});

export type GetProductByIdParamsSchema = z.infer<typeof getProductByIdParamsSchema>;

export const getProductByIdResponseSchema = z.object({
  product: z.object({
    id: z.coerce.number(),
    name: z.string(),
    code: z.string()
  })
});

export type GetProductByIdResponseSchema = z.infer<typeof getProductByIdResponseSchema>;
