import { Router } from "express";
import authRouter from "./auth.route";
import productRouter from "./product.route";
const appRouter = Router();
appRouter.use("/api", authRouter);
appRouter.use("/api", productRouter);
export default appRouter;
//# sourceMappingURL=route.js.map