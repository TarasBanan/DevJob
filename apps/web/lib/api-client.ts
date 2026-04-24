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

type JobsQueryParams = {
  q?: string;
  tag?: string;
  freshnessDays?: number;
  minSalary?: number;
  maxSalary?: number;
};

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

const makeRequestWithoutBody = async (path: string, init?: RequestInit): Promise<void> => {
  const response = await fetch(`http://localhost:4000${path}`, {
    ...init,
    credentials: "include",
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
};

const jobsQueryToString = (params: JobsQueryParams): string => {
  const query = new URLSearchParams();

  if (params.q) {
    query.set("q", params.q);
  }

  if (params.tag) {
    query.set("tag", params.tag);
  }

  if (params.freshnessDays) {
    query.set("freshnessDays", String(params.freshnessDays));
  }

  if (params.minSalary) {
    query.set("minSalary", String(params.minSalary));
  }

  if (params.maxSalary) {
    query.set("maxSalary", String(params.maxSalary));
  }

  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
};

export const apiClient = {
  registerPlaceholder: () => {
    return makeRequest("/api/auth/register", z.object({ message: z.string() }), { method: "POST", body: {} });
  },
  login: (body: { email: string; password: string }) => {
    return makeRequest("/api/auth/login", authPayloadSchema, { method: "POST", body });
  },
  logout: () => {
    return makeRequestWithoutBody("/api/auth/logout", { method: "POST" });
  },
  listJobs: (params: JobsQueryParams = {}) => makeRequest(`/api/jobs${jobsQueryToString(params)}`, jobsListSchema),
  getJob: (jobId: string) => makeRequest(`/api/jobs/${jobId}`, jobSchema),
  listCompanies: () => makeRequest("/api/companies", companiesListSchema),
  getCompany: (slug: string) => makeRequest(`/api/companies/${slug}`, companySchema),
  listMyApplications: () => makeRequest("/api/applications/me", applicationsListSchema),
  createApplication: (body: { jobId: string; resumeUrl: string }) => {
    return makeRequest("/api/applications", applicationSchema, { method: "POST", body });
  }
};
