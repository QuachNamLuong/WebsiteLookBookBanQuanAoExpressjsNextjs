import { Router } from "express";
import authRouter from "./auth.route";
import router from "./stars-section-image.route";


const appRouter = Router()

appRouter.use("/api", authRouter);
appRouter.use("/api", router)

export default appRouter;