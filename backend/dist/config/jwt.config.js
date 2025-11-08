import ms from "ms";
import { getEnvValue } from "../utils/env-value";
import { validateMsValue } from "../utils/validate-ms-value";
;
const expiresIn = getEnvValue("JWT_EXPIRES_IN");
validateMsValue("JWT_EXPIRES_IN", expiresIn);
const refreshExpiresIn = getEnvValue("JWT_REFRESH_EXPIRES_IN");
validateMsValue("JWT_REFRESH_EXPIRES_IN", refreshExpiresIn);
const jwtConfig = {
    secret: getEnvValue("JWT_SECRET"),
    expiresIn: ms(expiresIn),
    refreshSecret: getEnvValue("JWT_REFRESH_SECRET"),
    refreshExpiresIn: ms(refreshExpiresIn)
};
export default jwtConfig;
//# sourceMappingURL=jwt.config.js.map