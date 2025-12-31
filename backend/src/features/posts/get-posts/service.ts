import type { PrismaClient } from "@generated/prisma";
import { StatusCodes } from "http-status-codes";
import { AppError } from "types/app";
import { getPostsRepo } from "./repo";
import { countPostsRepo } from "../create-post/repo";
import type { GetPostsQuery } from "./schema";

export async function getPostsService(prisma: PrismaClient, query: GetPostsQuery) {
    try {
        const take = query.limit;
        const skip = (query.page - 1) * query.limit;
        const [posts, totalItems] = await Promise.all([
            getPostsRepo(prisma, { take, skip }),
            countPostsRepo(prisma)
        ]);

        const totalPages = Math.ceil(totalItems / query.limit);


        return {
            data: posts,
            meta: {
                page: query.page,
                pageSize: query.limit,
                totalItems,
                totalPages,
                hasNext: query.page < totalPages,
                hasPrev: query.page > 1,
            }
        }
    } catch (error) {
        if (error instanceof AppError) throw error;

        throw new AppError(
            1000,
            "Failed to getPostsService id",
            "Failed to getPostsService id",
            StatusCodes.INTERNAL_SERVER_ERROR
        )
    }
}