import ms from "ms";
import logger from "./logger";
export const validateMsValue = (name, value) => {
    if (ms(value) === undefined) {
        logger.error(`Invalid ${name} format: "${value}"`);
        process.exit(1);
    }
};
//# sourceMappingURL=validate-ms-value.js.map