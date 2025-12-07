import { Router } from "express";
import { catchAsync } from "utils/catch-async";
import { logoutHandler } from "./handler";

const logoutRoute = Router();

logoutRoute.post("/logout", catchAsync(logoutHandler));

export default logoutRoute;