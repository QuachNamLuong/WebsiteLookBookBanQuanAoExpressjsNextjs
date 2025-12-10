import { z } from 'zod';

export const updateProductParamsSchema = z.object({
  productId: z.coerce.number()
});

export type UpdateProductParamsSchema = z.infer<typeof updateProductParamsSchema>;

export const updateProductBodySchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  code: z.string(),
  nameMean: z.string(),
  material: z.string(),
  style: z.string(),
  color: z.string(),
  usage: z.string(),
  stock: z.coerce.number()
});

export type UpdateProductBodySchema = z.infer<typeof updateProductBodySchema>;


