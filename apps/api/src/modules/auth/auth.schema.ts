import { z } from "zod";
import { userRoleSchema } from "@devjob/shared";

export const registerBodySchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  role: userRoleSchema
});

export const loginBodySchema = z.object({
  email: z.string().email()
});
