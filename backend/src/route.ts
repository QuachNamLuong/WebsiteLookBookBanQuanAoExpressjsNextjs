import { Router } from "express";
import { authRoutes, cartRoutes, productRoutes, userRoutes } from "./features";

const appRouter = Router()

appRouter.use("/api", authRoutes);
appRouter.use("/api", userRoutes);
appRouter.use("/api", cartRoutes);
appRouter.use("/api", productRoutes);

export default appRouter;