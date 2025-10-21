import { getEnvValue } from "../utils/env-value";
import logger from "../utils/logger";

type AppMode = "development" | "production";

interface AppConfig {
  mode: AppMode;
  port: number;
  allowedOrigins: string[];
}

const mode = getEnvValue<AppMode>("APP_MODE", "development");
const port = Number(getEnvValue("PORT", "3000"));

const allowedOriginsEnv = getEnvValue<string>("ALLOWED_ORIGINS");

const allowedOrigins = allowedOriginsEnv
  .split(",")
  .map(origin => origin.trim())
  .filter(Boolean);

if (allowedOrigins.length === 0) {
  logger.error(`No valid ALLOWED_ORIGINS found in environment variable`);
  process.exit(1);
}

const appConfig: AppConfig = {
  mode,
  port,
  allowedOrigins
};

export default appConfig;