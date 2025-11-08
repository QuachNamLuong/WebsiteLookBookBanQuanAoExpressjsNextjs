import type { Secret } from "jsonwebtoken";
interface JwtConfig {
    secret: Secret;
    expiresIn: number;
    refreshSecret: Secret;
    refreshExpiresIn: number;
}
declare const jwtConfig: JwtConfig;
export default jwtConfig;
//# sourceMappingURL=jwt.config.d.ts.map