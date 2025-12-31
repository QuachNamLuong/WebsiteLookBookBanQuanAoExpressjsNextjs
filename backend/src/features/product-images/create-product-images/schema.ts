import z from "zod";

export const createPostImageRequestParams = z.object({
  productId: z.coerce.number()
});

export type CreatePostImageRequestParams = z.infer<typeof createPostImageRequestParams>;