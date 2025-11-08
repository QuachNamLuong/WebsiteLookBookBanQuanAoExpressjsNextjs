import dotenv from "dotenv";
dotenv.config();
export const getEnvValue = (name, defaultValue) => {
    const value = process.env[name];
    if (!value && defaultValue !== undefined)
        return defaultValue;
    if (!value) {
        console.error(`Missing environment variable: ${name}`);
        process.exit(1);
    }
    return value;
};
//# sourceMappingURL=env-value.js.map