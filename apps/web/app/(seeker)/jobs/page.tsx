import Link from "next/link";
import { apiClient } from "@/lib/api-client";

export default async function JobsPage(): Promise<JSX.Element> {
  const jobs = await apiClient.listJobs();

  return (
    <section className="space-y-6">
      <h1 className="font-display text-5xl leading-[1.05]">Каталог вакансий</h1>
      <div className="space-y-3">
        {jobs.items.map((job) => (
          <article key={job.id} className="border border-silver/70 p-5">
            <p className="font-display text-3xl leading-[1.1]">{job.title}</p>
            <p className="mt-2 text-silver">
              {job.city} · {job.salaryFrom}$ - {job.salaryTo}$
            </p>
            <Link href={`/jobs/${job.id}`} className="mt-4 inline-block rounded-full border border-showroom px-5 py-2 font-mono text-xs tracking-[1.2px]">
              DETAILS
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
