import { z } from 'zod';

export const updateProductParamsSchema = z.object({
  productId: z.number()
});

export type UpdateProductParamsSchema = z.infer<typeof updateProductParamsSchema>;

export const updateProductBodySchema = z.object({
  product: z.object({
    name: z.string()
  })
});

export type UpdateProductBodySchema = z.infer<typeof updateProductBodySchema>;


