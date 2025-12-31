import { Router } from "express";
import { getPostCategoriesHandler } from "./handler";
import { catchAsync } from "utils/catch-async";

const getPostCategoriesRoute = Router();

getPostCategoriesRoute.get("/", catchAsync(getPostCategoriesHandler));

export default getPostCategoriesRoute;