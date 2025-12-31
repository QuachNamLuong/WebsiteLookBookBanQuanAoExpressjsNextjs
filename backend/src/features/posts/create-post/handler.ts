import type { Request, Response } from "express";
import type { createPostRequestBody } from "./schema";
import { createPostService } from "./service";
import prisma from "lib/prisma";
import { StatusCodes } from "http-status-codes";

export async function createPostHandler(req: Request, res: Response) {
    // const body = req.validatedData?.body as createPostRequestBody;

    const { postId } = await createPostService(prisma);

    res.status(StatusCodes.OK).json({ postId });
}