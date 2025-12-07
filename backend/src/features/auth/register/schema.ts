import z from "zod";

export const registerBodySchema = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthday: z.coerce.date().optional().nullable(),
  email: z.email(),
  password: z.string()
});

export type RegisterBodySchema = z.infer<typeof registerBodySchema>;