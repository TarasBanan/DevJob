import { z } from "zod";

export const userRoleSchema = z.enum(["SEEKER", "EMPLOYER"]);

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  fullName: z.string().min(2),
  role: userRoleSchema,
  createdAt: z.string().datetime()
});

export const authPayloadSchema = z.object({
  user: userSchema,
  accessToken: z.string().min(10)
});

export type UserRole = z.infer<typeof userRoleSchema>;
