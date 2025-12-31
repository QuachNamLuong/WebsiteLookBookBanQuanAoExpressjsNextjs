import { Router } from "express";
import { validateRequest } from "middlewares/validate-request.middleware";
import { getPostByIdRequestParams } from "./schema";
import { catchAsync } from "utils/catch-async";
import { getPostByIdHandler } from "./handler";

const getPostBySlugRoute = Router();

getPostBySlugRoute.get(
  "/get-by-slug/:slug",
  validateRequest(getPostByIdRequestParams, "params"),
  catchAsync(getPostByIdHandler)
);

export default getPostBySlugRoute;