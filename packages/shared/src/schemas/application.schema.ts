import { z } from "zod";

export const applicationStatusSchema = z.enum(["PENDING", "REVIEW", "REJECTED", "ACCEPTED"]);

export const applicationSchema = z.object({
  id: z.string().uuid(),
  jobId: z.string().uuid(),
  seekerId: z.string().uuid(),
  resumeUrl: z.string().url(),
  status: applicationStatusSchema,
  createdAt: z.string().datetime()
});

export const applicationsListSchema = z.object({
  items: z.array(applicationSchema),
  total: z.number().int().nonnegative()
});
