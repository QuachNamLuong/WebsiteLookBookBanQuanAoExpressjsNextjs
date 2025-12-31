import type { PrismaClient } from "@generated/prisma";
import { StatusCodes } from "http-status-codes";
import { AppError } from "types/app";
import type { CreatePostInput } from "./schema";
import { createPostRepo, getLatestPostRepo } from "./repo";
import { validatePostSlugHelper } from "./helper";

export async function createPostService(prisma: PrismaClient, data?: CreatePostInput) {
    try {
        await validatePostSlugHelper(prisma, data?.postSlug??"", data?.postCategoryId?? 1);
        const latestPost = await getLatestPostRepo(prisma);

        const { postId } = await createPostRepo(prisma, {
            content: "",
            slug: `bai-viet-${latestPost.postId + 1}`,
            status: "PUBLISHED",
            title: `bai viet ${latestPost.postId + 1}`,
            category: { connect: { id: 1 } }
        });

        return { postId };
    } catch (error) {
        if (error instanceof AppError) throw error;

        throw new AppError(
            1000,
            `Failed to createPostService id: ${error}`,
            "Failed to createPostService id",
            StatusCodes.INTERNAL_SERVER_ERROR
        )
    }
}