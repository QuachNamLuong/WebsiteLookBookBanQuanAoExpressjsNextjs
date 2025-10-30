import express, { urlencoded } from "express";
import corsMiddleware from "./middlewares/cors.middleware";
import morganMiddleware from "./middlewares/morgan.middleware";
import { sanitizeMiddleware } from "./middlewares/sanitize.middleware";
import securityMiddleware from "./middlewares/security.middleware";
import rateLimiter from "./middlewares/ratelimiter.middleware";
import logger from "./utils/logger";
import appRouter from "./routers/route";
import { errorHandler } from "./middlewares/error.middleware";
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(urlencoded({extended: true}));
app.use(corsMiddleware);
securityMiddleware(app);
app.use(rateLimiter);
app.use(sanitizeMiddleware);
app.use(morganMiddleware);
app.use(errorHandler);

app.get("/", (req, res) => {
  logger.info("Root endpoint hit");
  res.json({ message: "Hello Secure API" });
});

app.use(appRouter);

export default app;