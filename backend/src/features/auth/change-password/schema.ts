import z from "zod";

export const changePasswordRequestBodySchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string()
});

export type ChangePasswordRequestBodySchema = z.infer<typeof changePasswordRequestBodySchema>;