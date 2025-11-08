export declare const createCustomerUser: (username: string, email: string, password: string) => Promise<{
    userId: string;
    username: string;
    email: string;
    passwordHash: string;
    role: import("../generated/prisma/index").$Enums.Role;
}>;
export declare const getUserById: (userId: string) => Promise<{
    userId: string;
    username: string;
    email: string;
    passwordHash: string;
    role: import("../generated/prisma/index").$Enums.Role;
}>;
//# sourceMappingURL=user.service.d.ts.map