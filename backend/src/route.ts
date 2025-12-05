import authRouter from "@features/auth/auth.route";
import createProductRoute from "@features/products/create-product/route";
import { Router } from "express";

const appRoute = Router();

// Product
appRoute.use("/api/product", createProductRoute);
appRoute.use("/api", authRouter)


export default appRoute;