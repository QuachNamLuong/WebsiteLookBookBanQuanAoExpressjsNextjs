import { Router } from "express";
import { validateRequest } from "middlewares/validate-request.middleware";
import { createPostRequestBody } from "./schema";
import { createPostHandler } from "./handler";
import { catchAsync } from "utils/catch-async";

const createPostRoute = Router();

createPostRoute.post(
    "/",
    // validateRequest(createPostRequestBody, "body"),
    catchAsync(createPostHandler)
);

export default createPostRoute;