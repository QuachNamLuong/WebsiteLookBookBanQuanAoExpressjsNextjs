import type { PrismaClient } from "@generated/prisma";
import { StatusCodes } from "http-status-codes";
import { AppError } from "types/app";

export async function getPostsRepo(prisma: PrismaClient, params: { take: number, skip: number }) {
    try {
        const posts = await prisma.post.findMany({ take: params.take, skip: params.skip, include: { category: true , images: true} });
        return posts;
    } catch (error) {
        throw new AppError(
            1000,
            "Failed to getPostsRepo id",
            "Failed to getPostsRepo id",
            StatusCodes.INTERNAL_SERVER_ERROR
        )
    }
}