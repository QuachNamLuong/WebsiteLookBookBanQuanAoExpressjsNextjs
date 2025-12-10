import { z } from 'zod';

export const deleteProductParamsSchema = z.object({
  productId: z.coerce.number()
});

export type DeleteProductParamsSchema = z.infer<typeof deleteProductParamsSchema>;