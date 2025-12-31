import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "lib/prisma";
import { catchAsync } from "utils/catch-async";

const deletePostByIdRoute = Router()

deletePostByIdRoute.delete("/:postId", catchAsync(async (req, res) => {
  const { postId } = req.params;

  await prisma.postImage.deleteMany({ where: { postId: Number(postId) } });
  const post = await prisma.post.delete({ where: { id: Number(postId) } });
  if (!post) {
    res.status(StatusCodes.NOT_FOUND).end();
    return;
  }

  res.status(StatusCodes.NO_CONTENT).end();
}));

export default deletePostByIdRoute;