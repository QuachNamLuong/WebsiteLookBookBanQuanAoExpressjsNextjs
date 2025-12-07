import type { Prisma, PrismaClient } from "@generated/prisma/client";
import { createNewUserRepo, getRoleByRoleName, getUserByEmailRepo, getUserByUsernameRepo } from "./repo";
import { AppError } from "types/app.d";
import { StatusCodes } from "http-status-codes";
import { hashPassword } from "utils/password";
import type { LoginBodySchema } from "../login/schema";
import type { RegisterBodySchema } from "./schema";

export async function getRoleUserHelper(prisma: PrismaClient) {
  try {
    const role = await getRoleByRoleName(prisma, "USER");
    if (!role) throw new AppError(
      1000,
      "role not found",
      "role not found",
      StatusCodes.INTERNAL_SERVER_ERROR
    );

    return role;
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1000,
      `Unhandle error in getRoleUser auth/register: ${error}`,
      "unhandler error", StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export async function validateNewUserEmailHelper(prisma: PrismaClient, email: string) {
  try {
    const user = await getUserByEmailRepo(prisma, email);
    if (user) throw new AppError(
      1000,
      "email already exits",
      "email already exits",
      StatusCodes.BAD_REQUEST
    );
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1000,
      `Unhandle error in registerService auth/register: ${error}`,
      "unhandler error", StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export async function validateNewUserUsernameHelper(prisma: PrismaClient, username: string) {
  try {
    const user = await getUserByUsernameRepo(prisma, username);
    if (user) throw new AppError(
      1000,
      "username already exits",
      "username already exits",
      StatusCodes.BAD_REQUEST
    );
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1000,
      `Unhandle error in registerService auth/register: ${error}`,
      "unhandler error", StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export async function createNewUserHelper(prisma: PrismaClient, roleId: number, registerRequestBody: RegisterBodySchema) {
  try {
    const passwordHash = await hashPassword(registerRequestBody.password);
    const { userId } = await createNewUserRepo(prisma, {
      email: registerRequestBody.email,
      passwordHash,
      username: registerRequestBody.username,
      roles: { connect: { id: roleId } }
    })
    return { userId };
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      1000,
      `Unhandle error in registerService auth/register: ${error}`,
      "unhandler error", StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}