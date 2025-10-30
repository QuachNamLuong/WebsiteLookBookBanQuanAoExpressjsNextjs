import type { Role } from "../generated/prisma/index";
import prisma from "../lib/prisma";
import { hashPassword } from "../utils/password";

class UserService {
  static createCustomerUser =  async (username: string, email: string, password: string) => {
    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash: hashedPassword,
        role: "CUSTOMER" as Role,
      },
    });

    return user;
  }
};

export default UserService;