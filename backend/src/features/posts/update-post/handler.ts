import type { Request, Response } from "express";
import { updatePostService } from "./service";
import prisma from "lib/prisma";
import { StatusCodes } from "http-status-codes";
import type { updatePostRequestBody, UpdatePostRequestParams } from "./schema";

export async function updatePostHandler(req: Request, res: Response) {
    const body = req.validatedData?.body as updatePostRequestBody;
    const {postId} = req.validatedData?.params as UpdatePostRequestParams;

    await updatePostService(prisma, postId, body.post);

    res.status(StatusCodes.NO_CONTENT).end()
}