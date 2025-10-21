import prisma from "../lib/prisma";
import type { Role } from "../generated/prisma";
import { signAccessToken, signRefreshToken } from "../utils/jwt";
import logger from "../utils/logger";
import { hashPassword } from "../utils/password";
import AuthHelper from "../helpers/auth.helper";
import UserService from "./user.service";

class AuthSerivce {
  static async registerCustomer(username: string, email: string, password: string) {
    await AuthHelper.checkUsenameExits(username);
    await AuthHelper.checkEmailExits(email)
    const user = await UserService.createCustomerUser(username, email, password);

    const accessToken = signAccessToken({
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    const refreshToken = signRefreshToken({ userId: user.id });

    logger.info(`User registered: ${user.email}`);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }
}


export default AuthSerivce;