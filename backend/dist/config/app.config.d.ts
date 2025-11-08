type AppMode = "development" | "production";
interface AppConfig {
    mode: AppMode;
    port: number;
    allowedOrigins: string[];
}
declare const appConfig: AppConfig;
export default appConfig;
//# sourceMappingURL=app.config.d.ts.map