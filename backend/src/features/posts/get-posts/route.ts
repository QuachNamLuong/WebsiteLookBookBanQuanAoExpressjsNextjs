import { Router } from "express";
import { catchAsync } from "utils/catch-async";
import { getPostsHandler } from "./handler";
import { validateRequest } from "middlewares/validate-request.middleware";
import { getPostsQuery } from "./schema";

const getPostsRoute = Router();

getPostsRoute.get("/", validateRequest(getPostsQuery, "query"), catchAsync(getPostsHandler));

export default getPostsRoute;