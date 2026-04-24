import Link from "next/link";
import { apiClient } from "@/lib/api-client";

type JobDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function JobDetailPage({ params }: JobDetailPageProps): Promise<JSX.Element> {
  const job = await apiClient.getJob(params.id);

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h1 className="font-display text-5xl leading-[1.05]">{job.title}</h1>
        <p className="text-silver">
          {job.city} · {job.salaryFrom}$ - {job.salaryTo}$ · {job.employmentType}
        </p>
        <div className="flex gap-3">
          <Link href={`/company/${job.companySlug}`} className="rounded-full border border-silver px-5 py-2 font-mono text-xs tracking-[1.2px]">
            О КОМПАНИИ
          </Link>
          <Link href="/profile" className="rounded-full border border-showroom px-5 py-2 font-mono text-xs tracking-[1.2px]">
            ОТКЛИКНУТЬСЯ
          </Link>
        </div>
      </div>

      <article className="border border-silver/70 p-5">
        <p className="font-mono text-xs tracking-[1.2px] text-silver">ОПИСАНИЕ</p>
        <p className="mt-3 text-silver">{job.description}</p>
      </article>

      <article className="border border-silver/70 p-5">
        <p className="font-mono text-xs tracking-[1.2px] text-silver">ТРЕБОВАНИЯ</p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-silver">
          {job.requirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <article className="border border-silver/70 p-5">
        <p className="font-mono text-xs tracking-[1.2px] text-silver">ПОХОЖИЕ ВАКАНСИИ (PLACEHOLDER)</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href="/jobs" className="rounded-full border border-silver px-4 py-2 font-mono text-xs tracking-[1.2px]">
            Backend Engineer
          </Link>
          <Link href="/jobs" className="rounded-full border border-silver px-4 py-2 font-mono text-xs tracking-[1.2px]">
            Frontend Engineer
          </Link>
          <Link href="/jobs" className="rounded-full border border-silver px-4 py-2 font-mono text-xs tracking-[1.2px]">
            Product Engineer
          </Link>
        </div>
      </article>
    </section>
  );
}
