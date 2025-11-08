import { type JwtPayload } from 'jsonwebtoken';
export interface AccessJwtPayload extends JwtPayload {
    userId: string;
}
export interface RefreshJwtPayload extends JwtPayload {
    userId: string;
}
export declare const signAccessToken: (payload: AccessJwtPayload) => string;
export declare const signRefreshToken: (payload: RefreshJwtPayload) => string;
export declare const verifyAccessToken: (token: string) => AccessJwtPayload;
export declare const verifyRefreshToken: (token: string) => RefreshJwtPayload;
//# sourceMappingURL=jwt.d.ts.map