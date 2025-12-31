import type { Request, Response } from "express";
import type { GetPostsQuery } from "./schema";
import { getPostsService } from "./service";
import prisma from "lib/prisma";
import { StatusCodes } from "http-status-codes";

export async function getPostsHandler(req: Request, res: Response) {
    const query = req.validatedData?.query as GetPostsQuery;

    const postPagination = await getPostsService(prisma, query);

    res.status(StatusCodes.OK).json(postPagination);
}