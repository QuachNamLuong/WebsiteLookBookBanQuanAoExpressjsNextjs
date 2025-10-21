import ms from "ms";
import logger from "./logger";

export const validateMsValue = (name: string, value: ms.StringValue): void => {
  if (ms(value) === undefined) {
    logger.error(`Invalid ${name} format: "${value}"`);
    process.exit(1);
  }
}