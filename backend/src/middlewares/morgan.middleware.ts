import morgan from "morgan";
import logger from "../utils/logger";
import appConfig from "../config/app.config";

const stream = {
  write: (message: string) => logger.http(message.trim()),
};

// Morgan format
const morganFormat =
  appConfig.mode === "production"
    ? "combined"
    : "dev";

const morganMiddleware = morgan(morganFormat, { stream });

export default morganMiddleware;
