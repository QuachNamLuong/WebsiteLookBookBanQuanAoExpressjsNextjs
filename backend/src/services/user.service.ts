import type { Role } from "../generated/prisma";
import prisma from "../lib/prisma";
import { hashPassword } from "../utils/password";

class UserService {
  static createCustomerUser =  async (username: string, email: string, password: string) => {
    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: "CUSTOMER" as Role,
      },
    });

    return user;
  }
};

export default UserService;