import { Router } from "express";
import { catchAsync } from "utils/catch-async";
import { getMeHandler } from "./handler";
import { authenticate } from "middlewares/auth.middleware";

const getMeRoute = Router();

getMeRoute.get(
  "/get-me", 
  authenticate,
  catchAsync(getMeHandler)
);

export default getMeRoute;
