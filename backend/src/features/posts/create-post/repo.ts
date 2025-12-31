import type { Prisma, PrismaClient } from "@generated/prisma";
import { StatusCodes } from "http-status-codes";
import { AppError } from "types/app";

export async function getPostCategoryById(prisma: PrismaClient, postCategoryId: number) {
    try {
        const category = await prisma.postCategory.findUnique({ where: { id: postCategoryId } });

        return category;
    } catch (error) {
        throw new AppError(
            1000,
            "Failed to getPostCategoryById",
            "Failed to getPostCategoryById",
            StatusCodes.INTERNAL_SERVER_ERROR
        )
    }
}

export async function countPostsRepo(prisma: PrismaClient): Promise<number> {
    try {
        const count = await prisma.post.count();
        return count;
    } catch (error) {
        throw new AppError(
            1000,
            "Failed to countPostsRepo",
            "Failed to countPostsRepo",
            StatusCodes.INTERNAL_SERVER_ERROR
        )
    }
}

export async function getPostBySlugAndPostCategoryIdRepo(prisma: PrismaClient, postSlug: string, postCategoryId: number) {
    try {
        const post = await prisma.post.findUnique({
            where: {
                slug_categoryId: {
                    categoryId: postCategoryId,
                    slug: postSlug
                }
            }
        }
        );
        return post;
    } catch (error) {
        throw new AppError(
            1000,
            "Failed to getPostBySlugAndPostCategoryIdRepo",
            "Failed to getPostBySlugAndPostCategoryIdRepo",
            StatusCodes.INTERNAL_SERVER_ERROR
        )
    }
}

export async function createPostRepo(prisma: PrismaClient, data: Prisma.PostCreateInput) {
    try {
        const { id } = await prisma.post.create({
            data, include: { images: true }
        })
        return { postId: id };
    } catch (error) {
        throw new AppError(
            1000,
            `Failed to createPostRepo: ${error}`,
            "Failed to createPostRepo",
            StatusCodes.INTERNAL_SERVER_ERROR
        )
    }
}

export async function getLatestPostRepo(prisma: PrismaClient) {
    try {
        const post = await prisma.post.findFirst({
            orderBy: {
                id: "desc",
            },
        });
        return { postId: post?.id ?? 1 };
    } catch (error) {
        throw new AppError(
            1000,
            `Failed to getLatestPostRepo: ${error}`,
            "Failed to getLatestPostRepo",
            StatusCodes.INTERNAL_SERVER_ERROR
        )
    }
}