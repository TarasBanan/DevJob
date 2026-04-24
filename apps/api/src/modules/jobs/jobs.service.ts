import { randomUUID } from "node:crypto";
import { jobSchema } from "@devjob/shared";
import type { z } from "zod";
import type { createJobBodySchema, jobsQuerySchema } from "./jobs.schema";

type Job = z.infer<typeof jobSchema>;

type JobInput = z.infer<typeof createJobBodySchema>;
type JobsQuery = z.infer<typeof jobsQuerySchema>;

const jobsStore: Job[] = [
  {
    id: randomUUID(),
    title: "Senior TypeScript Engineer",
    companySlug: "aurora-labs",
    city: "Remote",
    salaryFrom: 5000,
    salaryTo: 7000,
    employmentType: "FULL_TIME",
    description: "Build production-grade hiring workflows and optimize platform performance.",
    requirements: ["TypeScript", "Node.js", "PostgreSQL"],
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

export const jobsService = {
  list: (query: JobsQuery): Job[] => {
    return jobsStore.filter((job) => {
      const cityMatches = query.city ? job.city.toLowerCase().includes(query.city.toLowerCase()) : true;
      const typeMatches = query.type ? job.employmentType === query.type : true;
      const textMatches = query.q
        ? `${job.title} ${job.description}`.toLowerCase().includes(query.q.toLowerCase())
        : true;

      return cityMatches && typeMatches && textMatches;
    });
  },
  getById: (jobId: string): Job | null => {
    return jobsStore.find((job) => job.id === jobId) ?? null;
  },
  create: (input: JobInput): Job => {
    const job: Job = {
      id: randomUUID(),
      ...input,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    jobsStore.unshift(job);
    return job;
  }
};
