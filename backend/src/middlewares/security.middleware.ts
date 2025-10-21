import helmet from "helmet";
import express from "express";

const securityMiddleware = (app: express.Application) => {
  app.use(
    helmet({
      contentSecurityPolicy: false, // Disable for APIs (recommended)
      crossOriginEmbedderPolicy: false,
    })
  );
};

export default securityMiddleware;
