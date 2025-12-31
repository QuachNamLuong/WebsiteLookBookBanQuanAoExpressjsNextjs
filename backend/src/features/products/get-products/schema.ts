import { z } from 'zod';

export const getProductsQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(10).default(10),
  category: z.string().optional(),
  search: z.string().optional(),
  slug: z.string().optional()
});

export type GetProductsQuerySchema = z.infer<typeof getProductsQuerySchema>;


