import type { PrismaClient } from "@generated/prisma";
import { StatusCodes } from "http-status-codes";
import { AppError } from "types/app";
import type { UpdatePostInput } from "./schema";
import { updatePostRepo } from "./repo";
import { validatePostSlugHelper } from "./helper";

export async function updatePostService(prisma: PrismaClient, postId: number, data: UpdatePostInput) {
    try {
        await validatePostSlugHelper(prisma, postId, data.postSlug, data.postCategoryId);

        await updatePostRepo(prisma, postId, {
            content: data.content,
            slug: data.postSlug,
            status: "ARCHIVE",
            title: data.title,
            category: { connect: { id: data.postCategoryId } }
        });

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