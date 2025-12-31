import z from "zod";

export const getPostsQuery = z.object({
    page: z.coerce.number().min(1),
    limit: z.coerce.number().min(9)
});

export type GetPostsQuery = z.infer<typeof getPostsQuery>;