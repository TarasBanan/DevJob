import Link from "next/link";
import { apiClient } from "@/lib/api-client";

const filtersPlaceholder = ["Remote", "Berlin", "Warsaw", "Full-time", "Contract", "Internship"];

export default async function JobsPage(): Promise<JSX.Element> {
  const jobs = await apiClient.listJobs();

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h1 className="font-display text-5xl leading-[1.05]">Каталог вакансий</h1>
        <p className="max-w-3xl text-silver">
          Публикуемый контент: живые вакансии, фильтры и зарплатные диапазоны. Ниже — стартовые данные для наполнения каталога.
        </p>
        <div className="flex flex-wrap gap-2">
          {filtersPlaceholder.map((filter) => (
            <span key={filter} className="rounded-full border border-silver px-3 py-1 font-mono text-xs tracking-[1.2px] text-silver">
              {filter.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {jobs.items.map((job) => (
          <article key={job.id} className="border border-silver/70 p-5">
            <p className="font-display text-3xl leading-[1.1]">{job.title}</p>
            <p className="mt-2 text-silver">
              {job.city} · {job.salaryFrom}$ - {job.salaryTo}$ · {job.employmentType}
            </p>
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

      <div className="border border-silver/70 p-5">
        <p className="font-mono text-xs tracking-[1.2px] text-silver">CONTENT PLACEHOLDER</p>
        <p className="mt-2 text-silver">
          Здесь будет блок «Топ-компании недели», рекомендации по стеку и персональные подборки вакансий.
        </p>
      </div>
    </section>
  );
}
