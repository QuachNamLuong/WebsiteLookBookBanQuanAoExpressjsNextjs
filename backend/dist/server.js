import app from "./app";
import appConfig from "./config/app.config";
import logger from "./utils/logger";
app.listen(appConfig.port, () => {
    const url = `http://localhost:${appConfig.port}`;
    logger.info(`Server running in ${appConfig.mode} mode at ${url}`);
});
//# sourceMappingURL=server.js.map