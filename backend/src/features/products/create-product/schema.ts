import { z } from 'zod';

export const createProductBodySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  price: z.coerce.number(),
  quantity: z.coerce.number(),
  nameMeaning: z.string(),
  material: z.string(),
  color: z.string(),
  style: z.string(),
  usage: z.string()
});

export type CreateProductBody = z.infer<typeof createProductBodySchema>;