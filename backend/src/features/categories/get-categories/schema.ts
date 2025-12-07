import z from "zod";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string()
});

export type CategorySchema = z.infer<typeof categorySchema>;