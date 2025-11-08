import helmet from "helmet";
import express from "express";
const securityMiddleware = (app) => {
    app.use(helmet({
        contentSecurityPolicy: false, // Disable for APIs (recommended)
        crossOriginEmbedderPolicy: false,
    }));
};
export default securityMiddleware;
//# sourceMappingURL=security.middleware.js.map