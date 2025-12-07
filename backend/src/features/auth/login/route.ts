import { Router } from "express";
import { catchAsync } from "utils/catch-async";
import { loginHandler } from "./handler";
import { validateRequest } from "middlewares/validate-request.middleware";
import { loginBodySchema } from "./schema";

const loginRoute = Router();

loginRoute.post(
  "/login",
  validateRequest(loginBodySchema, "body"),
  catchAsync(loginHandler)
);

export default loginRoute;