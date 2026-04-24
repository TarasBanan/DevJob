import Link from "next/link";

type PagePreview = {
  title: string;
  description: string;
  href: string;
  cta: string;
};

const previews: PagePreview[] = [
  {
    title: "Job Catalog",
    description: "Filter jobs by city, employment type, and salary range with direct access to details.",
    href: "/jobs",
    cta: "OPEN CATALOG"
  },
  {
    title: "Seeker Profile",
    description: "Resume, applications, statuses, and recommendations for your next job-search steps.",
    href: "/profile",
    cta: "PROFILE"
  },
  {
    title: "Employer Dashboard",
    description: "Core HR metrics, candidate funnel, and vacancy performance overview.",
    href: "/dashboard",
    cta: "ANALYTICS"
  },
  {
    title: "Company Page",
    description: "Public company profile with description, tech stack, rating, and open roles.",
    href: "/company/aurora-labs",
    cta: "COMPANY PROFILE"
  }
];

export default function HomePage(): JSX.Element {
  return (
    <section className="space-y-12">
      <div className="space-y-6">
        <h1 className="font-display text-5xl uppercase leading-[1.05] sm:text-7xl">DevJob</h1>
        <p className="max-w-2xl text-lg text-silver">
          IT hiring platform: vacancies, applications, company profiles, and employer analytics.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/jobs" className="rounded-full border border-showroom px-6 py-3 font-mono text-sm tracking-[1.4px]">
            EXPLORE JOBS
          </Link>
          <Link href="/register" className="rounded-full border border-silver px-6 py-3 font-mono text-sm tracking-[1.4px]">
            CREATE ACCOUNT
          </Link>
          <Link href="/login" className="rounded-full border border-silver px-6 py-3 font-mono text-sm tracking-[1.4px]">
            LOGIN
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {previews.map((item) => (
          <article key={item.href} className="border border-silver/70 p-5">
            <p className="font-display text-3xl leading-[1.1]">{item.title}</p>
            <p className="mt-3 text-silver">{item.description}</p>
            <Link href={item.href} className="mt-5 inline-block rounded-full border border-showroom px-5 py-2 font-mono text-xs tracking-[1.2px]">
              {item.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
