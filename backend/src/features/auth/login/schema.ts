import { z } from 'zod';

export const loginBodySchema = z.object({
  identifier: z.string().refine((val) => {
    const isEmail = z.email().safeParse(val).success;

    const UsernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    const USERNAME_ERROR_MESSAGE = "Username must be 3-20 characters long and contain only letters, numbers, hyphens, or underscores.";

    const UsernameFormatSchema = z.string().regex(UsernameRegex, {
      error: USERNAME_ERROR_MESSAGE
    });

    const isUsername = UsernameFormatSchema.safeParse(val).success;

    return isEmail || isUsername
  }, { error: "Invalid username or email" }),
  password: z.string().min(8, { error: "Min length of password is 8" })
});

export type LoginBodySchema = z.infer<typeof loginBodySchema>;