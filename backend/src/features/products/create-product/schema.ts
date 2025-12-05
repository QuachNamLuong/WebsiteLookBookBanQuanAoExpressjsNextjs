import { z } from 'zod';

export const createProductBodySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
});

export type CreateProductBody = z.infer<typeof createProductBodySchema>;