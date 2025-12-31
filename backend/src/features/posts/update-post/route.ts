import { Router } from "express";
import { updatePostHandler } from "./handler";
import { catchAsync } from "utils/catch-async";
import { updatePostRequestBody, updatePostRequestParams } from "./schema";
import { validateRequest } from "middlewares/validate-request.middleware";

const updatePostRoute = Router();

updatePostRoute.put(
    "/:postId",
    validateRequest(updatePostRequestBody, "body"),
    validateRequest(updatePostRequestParams, "params"),
    catchAsync(updatePostHandler)
);

export default updatePostRoute;