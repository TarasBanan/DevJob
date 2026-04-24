import { z } from "zod";

export const employmentTypeSchema = z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"]);

export const jobSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3),
  companySlug: z.string().min(2),
  city: z.string().min(2),
  salaryFrom: z.number().int().nonnegative(),
  salaryTo: z.number().int().nonnegative(),
  employmentType: employmentTypeSchema,
  description: z.string().min(20),
  requirements: z.array(z.string().min(2)).min(1),
  isActive: z.boolean(),
  createdAt: z.string().datetime()
});

export const jobsListSchema = z.object({
  items: z.array(jobSchema),
  total: z.number().int().nonnegative()
});
