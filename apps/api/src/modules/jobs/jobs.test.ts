import { describe, expect, it } from "vitest";
import { jobsService } from "./jobs.service";

describe("jobsService", () => {
  it("filters jobs by text", () => {
    const result = jobsService.list({ q: "typescript" });
    expect(result.length).toBeGreaterThan(0);
  });

  it("creates a job", () => {
    const created = jobsService.create({
      title: "Backend Engineer",
      companySlug: "aurora-labs",
      city: "Berlin",
      salaryFrom: 4000,
      salaryTo: 6000,
      employmentType: "FULL_TIME",
      description: "Own backend modules and API quality in a production platform.",
      requirements: ["Node.js", "Express"]
    });

    expect(created.id).toBeDefined();
    expect(created.title).toBe("Backend Engineer");
  });
});
