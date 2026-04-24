import { randomUUID } from "node:crypto";
import { Router } from "express";
import { applicationSchema, applicationsListSchema } from "@devjob/shared";
import { z } from "zod";
import { AppError } from "../../middleware/error";
import { requireAuth, requireRole, type AuthedRequest } from "../../middleware/auth";

const createApplicationBodySchema = z.object({
  jobId: z.string().uuid(),
  resumeUrl: z.string().url()
});

type ApplicationRecord = z.infer<typeof applicationSchema>;

const applications: ApplicationRecord[] = [];

export const applicationsRouter = Router();

applicationsRouter.get("/me", requireAuth, requireRole("SEEKER"), (req: AuthedRequest, res) => {
  const items = applications.filter((item) => item.seekerId === req.auth?.sub);
  res.json(applicationsListSchema.parse({ items, total: items.length }));
});

applicationsRouter.post("/", requireAuth, requireRole("SEEKER"), (req: AuthedRequest, res, next) => {
  const parsed = createApplicationBodySchema.safeParse(req.body);

  if (!parsed.success) {
    next(new AppError("Invalid payload", 400));
    return;
  }

  if (!req.auth) {
    next(new AppError("Unauthorized", 401));
    return;
  }

  const record: ApplicationRecord = {
    id: randomUUID(),
    jobId: parsed.data.jobId,
    seekerId: req.auth.sub,
    resumeUrl: parsed.data.resumeUrl,
    status: "PENDING",
    createdAt: new Date().toISOString()
  };

  applications.unshift(record);
  res.status(201).json(applicationSchema.parse(record));
});
