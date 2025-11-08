import prisma from "../lib/prisma";
export const checkEmailExits = async (email) => {
    const existingEmailUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingEmailUser) {
        throw new Error("User with this email already exists");
    }
};
export const checkUsenameExits = async (username) => {
    const existingUsernameUser = await prisma.user.findUnique({
        where: { username },
    });
    if (existingUsernameUser) {
        throw new Error("User with this email already exists");
    }
};
//# sourceMappingURL=auth.helper.js.map