import { Router } from "express";
import productRouter from "./product.route";
import productImageRouter from "./product-image.route";
import cartRouter from "./cart.route";
import { authRoutes, userRoutes, cartRoutes } from "../features";

const appRouter = Router()

appRouter.use("/api", authRoutes);
appRouter.use("/api", productRouter);
appRouter.use("/api", productImageRouter);
appRouter.use("/api", userRoutes);
appRouter.use("/api", cartRoutes);

export default appRouter;