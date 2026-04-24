import { randomUUID } from "node:crypto";
import { jobSchema } from "@devjob/shared";
import type { z } from "zod";
import type { createJobBodySchema, jobsQuerySchema } from "./jobs.schema";

type Job = z.infer<typeof jobSchema>;

type JobInput = z.infer<typeof createJobBodySchema>;
type JobsQuery = z.infer<typeof jobsQuerySchema>;

const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

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
    requirements: ["TypeScript", "Node.js", "PostgreSQL", "Remote"],
    isActive: true,
    createdAt: daysAgo(1)
  },
  {
    id: randomUUID(),
    title: "Frontend Engineer",
    companySlug: "vector-soft",
    city: "Berlin",
    salaryFrom: 4200,
    salaryTo: 5800,
    employmentType: "FULL_TIME",
    description: "Ship performant frontend features with React and Next.js in a product team.",
    requirements: ["React", "Next.js", "TypeScript", "UI"],
    isActive: true,
    createdAt: daysAgo(2)
  },
  {
    id: randomUUID(),
    title: "Backend Engineer",
    companySlug: "aurora-labs",
    city: "Warsaw",
    salaryFrom: 4300,
    salaryTo: 6200,
    employmentType: "FULL_TIME",
    description: "Develop API modules, maintain service reliability, and improve data flows.",
    requirements: ["Node.js", "Express", "PostgreSQL", "API"],
    isActive: true,
    createdAt: daysAgo(5)
  },
  {
    id: randomUUID(),
    title: "DevOps Engineer",
    companySlug: "vector-soft",
    city: "Remote",
    salaryFrom: 4800,
    salaryTo: 6800,
    employmentType: "CONTRACT",
    description: "Automate infrastructure, CI/CD pipelines, and observability for critical services.",
    requirements: ["Kubernetes", "AWS", "Terraform", "Remote"],
    isActive: true,
    createdAt: daysAgo(8)
  },
  {
    id: randomUUID(),
    title: "QA Automation Engineer",
    companySlug: "aurora-labs",
    city: "Prague",
    salaryFrom: 3200,
    salaryTo: 4800,
    employmentType: "FULL_TIME",
    description: "Own test automation strategy and keep release quality predictable.",
    requirements: ["Playwright", "Vitest", "Testing", "Automation"],
    isActive: true,
    createdAt: daysAgo(3)
  },
  {
    id: randomUUID(),
    title: "Data Analyst",
    companySlug: "vector-soft",
    city: "Remote",
    salaryFrom: 3000,
    salaryTo: 4500,
    employmentType: "PART_TIME",
    description: "Analyze hiring funnel metrics and create actionable dashboards for HR teams.",
    requirements: ["SQL", "BI", "Analytics", "Remote"],
    isActive: true,
    createdAt: daysAgo(10)
  },
  {
    id: randomUUID(),
    title: "Product Designer",
    companySlug: "aurora-labs",
    city: "Lisbon",
    salaryFrom: 3500,
    salaryTo: 5100,
    employmentType: "CONTRACT",
    description: "Design product flows and interfaces for job seekers and employers.",
    requirements: ["Figma", "UX", "UI", "Design"],
    isActive: true,
    createdAt: daysAgo(6)
  }
];

export const jobsService = {
  list: (query: JobsQuery): Job[] => {
    const now = Date.now();

    return jobsStore
      .filter((job) => {
        const cityMatches = query.city ? job.city.toLowerCase().includes(query.city.toLowerCase()) : true;
        const typeMatches = query.type ? job.employmentType === query.type : true;
        const textMatches = query.q
          ? `${job.title} ${job.description}`.toLowerCase().includes(query.q.toLowerCase())
          : true;
        const tagMatches = query.tag
          ? job.requirements.some((item) => item.toLowerCase().includes(query.tag.toLowerCase()))
          : true;
        const minSalaryMatches = query.minSalary ? job.salaryTo >= query.minSalary : true;
        const maxSalaryMatches = query.maxSalary ? job.salaryFrom <= query.maxSalary : true;
        const freshnessMatches = query.freshnessDays
          ? now - new Date(job.createdAt).getTime() <= query.freshnessDays * 24 * 60 * 60 * 1000
          : true;

        return cityMatches && typeMatches && textMatches && tagMatches && minSalaryMatches && maxSalaryMatches && freshnessMatches;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
