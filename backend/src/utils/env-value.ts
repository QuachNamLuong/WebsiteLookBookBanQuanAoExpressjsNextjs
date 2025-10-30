import dotenv from "dotenv";

dotenv.config();

export const getEnvValue = <T = string>(name: string, defaultValue?: T): T => {
  const value = process.env[name];
  if (!value && defaultValue !== undefined) return defaultValue;
  if (!value) {
    console.error(`Missing environment variable: ${name}`);
    process.exit(1);
  }
  return value as unknown as T;
};
