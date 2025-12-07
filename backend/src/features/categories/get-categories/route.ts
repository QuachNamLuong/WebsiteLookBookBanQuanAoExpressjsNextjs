import { Router } from "express";
import { catchAsync } from "utils/catch-async";
import { getCategoriesHandler } from "./handler";

const getCategoriesRoute = Router();

getCategoriesRoute.get(
  "/get-categories",
  catchAsync(getCategoriesHandler)
);

export default getCategoriesRoute;