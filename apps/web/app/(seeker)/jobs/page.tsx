import Link from "next/link";
import { apiClient } from "@/lib/api-client";

type JobsPageProps = {
  searchParams?: {
    q?: string;
    tag?: string;
    freshnessDays?: string;
    minSalary?: string;
    maxSalary?: string;
  };
};

const tags = ["TypeScript", "React", "Node.js", "Remote", "UI", "Analytics", "AWS"];

const parseNumber = (value?: string): number | undefined => {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed;
};

export default async function JobsPage({ searchParams }: JobsPageProps): Promise<JSX.Element> {
  const filters = {
    q: searchParams?.q,
    tag: searchParams?.tag,
    freshnessDays: parseNumber(searchParams?.freshnessDays),
    minSalary: parseNumber(searchParams?.minSalary),
    maxSalary: parseNumber(searchParams?.maxSalary)
  };

  const jobs = await apiClient.listJobs(filters);

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h1 className="font-display text-5xl leading-[1.05]">Job Catalog</h1>
        <p className="max-w-3xl text-silver">Search and filter vacancies by tags, freshness, and salary range.</p>
      </div>

      <form className="grid gap-3 border border-silver/70 p-4 sm:grid-cols-2 lg:grid-cols-5" method="get">
        <input
          name="q"
          defaultValue={searchParams?.q ?? ""}
          placeholder="Search by title or text"
          className="border border-silver bg-velvet px-3 py-2 text-sm"
        />
        <select name="tag" defaultValue={searchParams?.tag ?? ""} className="border border-silver bg-velvet px-3 py-2 text-sm">
          <option value="">Any tag</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <select
          name="freshnessDays"
          defaultValue={searchParams?.freshnessDays ?? ""}
          className="border border-silver bg-velvet px-3 py-2 text-sm"
        >
          <option value="">Any date</option>
          <option value="1">Last 24h</option>
          <option value="3">Last 3 days</option>
          <option value="7">Last 7 days</option>
        </select>
        <input
          name="minSalary"
          defaultValue={searchParams?.minSalary ?? ""}
          placeholder="Min salary"
          className="border border-silver bg-velvet px-3 py-2 text-sm"
        />
        <input
          name="maxSalary"
          defaultValue={searchParams?.maxSalary ?? ""}
          placeholder="Max salary"
          className="border border-silver bg-velvet px-3 py-2 text-sm"
        />
        <button type="submit" className="rounded-full border border-showroom px-5 py-2 font-mono text-xs tracking-[1.2px] sm:col-span-2 lg:col-span-5">
          APPLY FILTERS
        </button>
      </form>

      <div className="space-y-3">
        {jobs.items.map((job) => (
          <article key={job.id} className="border border-silver/70 p-5">
            <p className="font-display text-3xl leading-[1.1]">{job.title}</p>
            <p className="mt-2 text-silver">
              {job.city} · {job.salaryFrom}$ - {job.salaryTo}$ · {job.employmentType}
            </p>
            <p className="mt-2 font-mono text-xs tracking-[1.2px] text-silver">{new Date(job.createdAt).toLocaleDateString("en-US")}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {job.requirements.map((item) => (
                <span key={item} className="rounded-full border border-silver px-2 py-1 font-mono text-[10px] tracking-[1.2px] text-silver">
                  {item.toUpperCase()}
                </span>
              ))}
            </div>
            <p className="mt-3 text-silver">{job.description}</p>
            <div className="mt-4 flex gap-3">
              <Link href={`/jobs/${job.id}`} className="inline-block rounded-full border border-showroom px-5 py-2 font-mono text-xs tracking-[1.2px]">
                DETAILS
              </Link>
              <Link href={`/company/${job.companySlug}`} className="inline-block rounded-full border border-silver px-5 py-2 font-mono text-xs tracking-[1.2px]">
                COMPANY
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
