import { StatusCodes } from "http-status-codes";
import prisma from "../lib/prisma";
import { AppError } from "../types/app.d";
import logger from "../utils/logger";
import { hashPassword } from "../utils/password";
export const createCustomerUser = async (username, email, password) => {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
        data: {
            username,
            email,
            passwordHash: hashedPassword,
            role: "CUSTOMER",
        },
    });
    return user;
};
export const getUserById = async (userId) => {
    try {
        const user = await prisma.user.findUnique({ where: { userId } });
        if (!user)
            throw new AppError(404, `User with id ${userId} is not found`, "User not found", StatusCodes.NOT_FOUND);
        return user;
    }
    catch (error) {
        if (error instanceof AppError)
            throw error;
        throw new AppError(500, `Database error: ${error}`, "Internal server error", StatusCodes.INTERNAL_SERVER_ERROR);
    }
};
//# sourceMappingURL=user.service.js.map