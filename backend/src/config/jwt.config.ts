import type { Secret } from "jsonwebtoken";
import ms from "ms";
import { getEnvValue } from "../utils/env-value";
import { validateMsValue } from "../utils/validate-ms-value";

interface JwtConfig {
  secret: Secret,
  expiresIn: number
  refreshSecret: Secret
  refreshExpiresIn: number
};

const expiresIn = getEnvValue<ms.StringValue>("JWT_EXPIRES_IN");
validateMsValue("JWT_EXPIRES_IN", expiresIn);

const refreshExpiresIn = getEnvValue<ms.StringValue>("JWT_REFRESH_EXPIRES_IN");
validateMsValue("JWT_REFRESH_EXPIRES_IN", refreshExpiresIn)

const jwtConfig: JwtConfig = {
  secret: getEnvValue<Secret>("JWT_SECRET"),
  expiresIn: ms(expiresIn),
  refreshSecret: getEnvValue<Secret>("JWT_REFRESH_SECRET"),
  refreshExpiresIn: ms(refreshExpiresIn)
};

export default jwtConfig;