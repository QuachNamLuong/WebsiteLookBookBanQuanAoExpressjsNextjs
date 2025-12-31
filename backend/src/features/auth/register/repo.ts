import type { Prisma, PrismaClient, RoleName } from "@generated/prisma";
import { StatusCodes } from "http-status-codes";
import { AppError } from "types/app";

export async function getRoleByRoleName(prisma: PrismaClient, roleName: RoleName) {
  try {
    const role = prisma.role.findUnique({ where: { name: roleName } });
    return role;
  } catch (error) {
    throw new AppError(
      1000,
      `Unhandle error: ${error} in getUserByEmailRepo auth/register`,
      "unhandler error", StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export async function getUserByEmailRepo(prisma: PrismaClient, email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    throw new AppError(
      1000,
      `Unhandle error: ${error} in getUserByEmailRepo auth/register`,
      "unhandler error", StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export async function getUserByUsernameRepo(prisma: PrismaClient, username: string) {
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    return user;
  } catch (error) {
    throw new AppError(
      1000,
      `Unhandle error: ${error} in getUserByUsernameRepo auth/register`,
      "unhandler error", StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export async function createNewUserRepo(prisma: PrismaClient, userData: Prisma.UserCreateInput) {
  try {
    const { id } = await prisma.user.create({ data: userData });
    return { userId: id };
  } catch (error) {
    throw new AppError(
      1000,
      `Unhandle error: ${error} in createNewUser auth/register`,
      "unhandler error", StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}