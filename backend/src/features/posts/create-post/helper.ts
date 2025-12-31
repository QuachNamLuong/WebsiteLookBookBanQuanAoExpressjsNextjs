import type { PrismaClient } from "@generated/prisma";
import { AppError } from "types/app";
import { getPostBySlugAndPostCategoryIdRepo, getPostCategoryById } from "./repo";
import { StatusCodes } from "http-status-codes";

export async function validatePostCategoryIdHelper(prisma: PrismaClient, postCategoryId: number) {
    try {
        const category = await getPostCategoryById(prisma, postCategoryId);
        if (!category) throw new AppError(
            1000,
            "Post category not exits",
            "Post category not exits",
            StatusCodes.NOT_FOUND
        )
    } catch (error) {
        if (error instanceof AppError) throw error;

        throw new AppError(
            1000,
            "Fail to validatePostCategoryIdHelper",
            "Fail to validatePostCategoryIdHelper",
            StatusCodes.NOT_FOUND
        )
    }
}

export async function validatePostSlugHelper(prisma: PrismaClient, slug: string, postCategoryId: number) {
    try {
        await validatePostCategoryIdHelper(prisma, postCategoryId);

        const post = await getPostBySlugAndPostCategoryIdRepo(prisma, slug, postCategoryId);
        if (post) throw new AppError(
            1000,
            "Slug already extist",
            "Slug already extist",
            StatusCodes.CONFLICT
        );
    } catch (error) {
        if (error instanceof AppError) throw error;

        throw new AppError(
            1000,
            "Fail to validatePostSlugHelper",
            "Fail to validatePostSlugHelper",
            StatusCodes.NOT_FOUND
        )
    }
}