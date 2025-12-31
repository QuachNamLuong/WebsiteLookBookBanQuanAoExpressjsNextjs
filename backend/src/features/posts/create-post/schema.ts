import z from "zod";

export const createPostInput = z.object({
    postSlug: z.string().optional(),
    postCategoryId: z.coerce.number().optional(),
    content: z.string().default("").optional(),
    title: z.string().default("").optional()
});

export type CreatePostInput = z.infer<typeof createPostInput>;

export const createPostRequestBody = z.object({
    post: createPostInput.optional()
});

export type createPostRequestBody = z.infer<typeof createPostRequestBody>;