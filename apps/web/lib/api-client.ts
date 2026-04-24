import {
  applicationSchema,
  applicationsListSchema,
  authPayloadSchema,
  companiesListSchema,
  companySchema,
  jobSchema,
  jobsListSchema
} from "@devjob/shared";
import { z } from "zod";

type RequestInitWithBody = RequestInit & { body?: unknown };

const makeRequest = async <TSchema extends z.ZodTypeAny>(
  path: string,
  schema: TSchema,
  init?: RequestInitWithBody
): Promise<z.infer<TSchema>> => {
  const response = await fetch(`http://localhost:4000${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const json: unknown = await response.json();
  return schema.parse(json);
};

export const apiClient = {
  register: (body: { email: string; fullName: string; role: "SEEKER" | "EMPLOYER" }) => {
    return makeRequest("/api/auth/register", authPayloadSchema, { method: "POST", body });
  },
  login: (body: { email: string }) => {
    return makeRequest("/api/auth/login", authPayloadSchema, { method: "POST", body });
  },
  listJobs: () => makeRequest("/api/jobs", jobsListSchema),
  getJob: (jobId: string) => makeRequest(`/api/jobs/${jobId}`, jobSchema),
  listCompanies: () => makeRequest("/api/companies", companiesListSchema),
  getCompany: (slug: string) => makeRequest(`/api/companies/${slug}`, companySchema),
  listMyApplications: () => makeRequest("/api/applications/me", applicationsListSchema),
  createApplication: (body: { jobId: string; resumeUrl: string }) => {
    return makeRequest("/api/applications", applicationSchema, { method: "POST", body });
  }
};
