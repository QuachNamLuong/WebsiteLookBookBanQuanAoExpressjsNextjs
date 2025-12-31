import { Router } from "express";
import { catchAsync } from "utils/catch-async";
import { getAllProductCollectionsHandler } from "./handle";

const getAllProductCollectionsRoute = Router();

getAllProductCollectionsRoute.get("/get-all", catchAsync(getAllProductCollectionsHandler));

export default getAllProductCollectionsRoute;