import z from "zod";

export const updatePostInput = z.object({
    postSlug: z.string(),
    postCategoryId: z.coerce.number(),
    content: z.string().default(""),
    title: z.string().default("")
});

export type UpdatePostInput = z.infer<typeof updatePostInput>;

export const updatePostRequestBody = z.object({
    post: updatePostInput
});

export type updatePostRequestBody = z.infer<typeof updatePostRequestBody>;

export const updatePostRequestParams = z.object({
    postId: z.coerce.number()
});

export type UpdatePostRequestParams = z.infer<typeof updatePostRequestParams>;