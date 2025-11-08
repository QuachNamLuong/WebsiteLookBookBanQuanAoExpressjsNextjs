declare class AuthSerivce {
    static registerCustomer(username: string, email: string, password: string): Promise<{
        user: {
            id: string;
            username: string;
            email: string;
            role: import("../generated/prisma").$Enums.Role;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    static login(username: string, password: string): Promise<{
        user: {
            id: string;
            username: string;
            email: string;
            role: import("../generated/prisma").$Enums.Role;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    static refreshTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
export default AuthSerivce;
//# sourceMappingURL=auth.service.d.ts.map