import { z } from "zod";
import { employmentTypeSchema } from "@devjob/shared";

export const jobsQuerySchema = z.object({
  city: z.string().optional(),
  type: employmentTypeSchema.optional(),
  q: z.string().optional(),
  tag: z.string().optional(),
  minSalary: z.coerce.number().int().nonnegative().optional(),
  maxSalary: z.coerce.number().int().nonnegative().optional(),
  freshnessDays: z.coerce.number().int().positive().optional()
});

export const createJobBodySchema = z.object({
  title: z.string().min(3),
  companySlug: z.string().min(2),
  city: z.string().min(2),
  salaryFrom: z.number().int().positive(),
  salaryTo: z.number().int().positive(),
  employmentType: employmentTypeSchema,
  description: z.string().min(20),
  requirements: z.array(z.string().min(2)).min(1)
});
