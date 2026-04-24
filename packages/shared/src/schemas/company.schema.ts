import { z } from "zod";

export const companySchema = z.object({
  slug: z.string().min(2),
  name: z.string().min(2),
  about: z.string().min(20),
  stack: z.array(z.string().min(2)).min(1),
  rating: z.number().min(0).max(5)
});

export const companiesListSchema = z.object({
  items: z.array(companySchema),
  total: z.number().int().nonnegative()
});
