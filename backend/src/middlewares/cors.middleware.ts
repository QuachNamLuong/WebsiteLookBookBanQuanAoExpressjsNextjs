import cors from "cors";
import appConfig from "../config/app.config";

const corsMiddleware = cors({
  origin: appConfig.allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
});

export default corsMiddleware;
