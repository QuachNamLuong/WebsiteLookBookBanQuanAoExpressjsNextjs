import z from "zod";

export const getPostByIdRequestParams = z.object({
  slug: z.string()
});

export type GetPostByIdRequestParams = z.infer<typeof getPostByIdRequestParams>;