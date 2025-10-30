import { Router } from "express";
import authRouter from "./auth.route";


const appRouter = Router()

appRouter.use("/api", authRouter);

export default appRouter;