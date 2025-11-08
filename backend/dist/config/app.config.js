import { getEnvValue } from "../utils/env-value";
import logger from "../utils/logger";
const mode = getEnvValue("APP_MODE", "development");
const port = Number(getEnvValue("PORT", "3000"));
const allowedOriginsEnv = getEnvValue("ALLOWED_ORIGINS");
const allowedOrigins = allowedOriginsEnv
    .split(",")
    .map(origin => origin.trim())
    .filter(Boolean);
if (allowedOrigins.length === 0) {
    logger.error(`No valid ALLOWED_ORIGINS found in environment variable`);
    process.exit(1);
}
const appConfig = {
    mode,
    port,
    allowedOrigins
};
export default appConfig;
//# sourceMappingURL=app.config.js.map