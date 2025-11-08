import bcrypt from "bcryptjs";
import logger from "./logger";
import { getEnvValue } from "./env-value";
const SALT_ROUNDS = getEnvValue("SALT_ROUNDS", 10);
export const hashPassword = async (password) => {
    try {
        const hashed = await bcrypt.hash(password, SALT_ROUNDS);
        return hashed;
    }
    catch (err) {
        logger.error("Error hashing password:", err);
        throw new Error("Failed to hash password");
    }
};
export const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    }
    catch (err) {
        logger.error("Error comparing password:", err);
        throw new Error("Failed to compare password");
    }
};
//# sourceMappingURL=password.js.map