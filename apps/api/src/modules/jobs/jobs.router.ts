import { Router } from "express";
import { jobSchema, jobsListSchema } from "@devjob/shared";
import { AppError } from "../../middleware/error";
import { requireAuth, requireRole } from "../../middleware/auth";
import { createJobBodySchema, jobsQuerySchema } from "./jobs.schema";
import { jobsService } from "./jobs.service";

export const jobsRouter = Router();

jobsRouter.get("/", (req, res, next) => {
  const parsed = jobsQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    next(new AppError("Invalid query", 400));
    return;
  }

  const items = jobsService.list(parsed.data);
  res.json(jobsListSchema.parse({ items, total: items.length }));
});

jobsRouter.get("/:jobId", (req, res, next) => {
  const item = jobsService.getById(req.params.jobId);

  if (!item) {
    next(new AppError("Job not found", 404));
    return;
  }

  res.json(jobSchema.parse(item));
});

jobsRouter.post("/", requireAuth, requireRole("EMPLOYER"), (req, res, next) => {
  const parsed = createJobBodySchema.safeParse(req.body);

  if (!parsed.success) {
    next(new AppError(parsed.error.issues[0]?.message ?? "Invalid payload", 400));
    return;
  }

  const item = jobsService.create(parsed.data);
  res.status(201).json(jobSchema.parse(item));
});
