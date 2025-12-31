import z from "zod";

export const createPostImageRequestParams = z.object({
  postId: z.coerce.number()
});

export type CreatePostImageRequestParams = z.infer<typeof createPostImageRequestParams>;