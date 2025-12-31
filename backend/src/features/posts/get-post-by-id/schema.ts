import z from "zod";

export const getPostByIdRequestParams = z.object({
  postId: z.coerce.number()
});

export type GetPostByIdRequestParams = z.infer<typeof getPostByIdRequestParams>;