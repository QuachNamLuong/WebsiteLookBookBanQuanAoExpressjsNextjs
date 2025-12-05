import { z } from 'zod';


export const getProductsQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(10).default(10),
  category: z.string().optional(),
  search: z.string().optional(),
});

export type GetProductsQuerySchema = z.infer<typeof getProductsQuerySchema>;


