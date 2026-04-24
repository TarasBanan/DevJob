import Link from "next/link";
import { cookies } from "next/headers";

type PagePreview = {
  title: string;
  description: string;
  href: string;
  cta: string;
};

const guestPreviews: PagePreview[] = [
  {
    title: "Job Catalog",
    description: "Filter jobs by city, employment type, and salary range with direct access to details.",
    href: "/jobs",
    cta: "OPEN CATALOG"
  },
  {
    title: "Company Page",
    description: "Public company profile with description, tech stack, rating, and open roles.",
    href: "/company/aurora-labs",
    cta: "COMPANY PROFILE"
  }
];

const seekerPreviews: PagePreview[] = [
  {
    title: "Job Catalog",
    description: "Search vacancies, apply filters, and review detailed requirements.",
    href: "/jobs",
    cta: "OPEN CATALOG"
  },
  {
    title: "Seeker Profile",
    description: "Track applications, resume status, and personalized recommendations.",
    href: "/profile",
    cta: "PROFILE"
  },
  {
    title: "Company Page",
    description: "Review company stack, rating, and open opportunities.",
    href: "/company/aurora-labs",
    cta: "COMPANY PROFILE"
  }
];

const employerPreviews: PagePreview[] = [
  {
    title: "Employer Dashboard",
    description: "Monitor funnel conversion, traffic quality, and hiring metrics.",
    href: "/dashboard",
    cta: "ANALYTICS"
  },
  {
    title: "Vacancies",
    description: "Manage vacancy pipeline statuses and keep postings current.",
    href: "/vacancies",
    cta: "VACANCIES"
  },
  {
    title: "Job Catalog",
    description: "Compare your vacancies against market supply in the public feed.",
    href: "/jobs",
    cta: "OPEN CATALOG"
  }
];

export default function HomePage(): JSX.Element {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;
  const roleCookie = cookieStore.get("role")?.value;
  const role = token ? roleCookie : undefined;
  const previews = role === "SEEKER" ? seekerPreviews : role === "EMPLOYER" ? employerPreviews : guestPreviews;

  return (
    <section className="space-y-12">
      <div className="space-y-6">
        <h1 className="font-display text-5xl uppercase leading-[1.05] sm:text-7xl">DevJob</h1>
        <p className="max-w-2xl text-lg text-silver">IT hiring platform: vacancies, applications, company profiles, and employer analytics.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/jobs" className="rounded-full border border-showroom px-6 py-3 font-mono text-sm tracking-[1.4px]">
            EXPLORE JOBS
          </Link>
          {!role ? (
            <>
              <Link href="/register" className="rounded-full border border-silver px-6 py-3 font-mono text-sm tracking-[1.4px]">
                CREATE ACCOUNT
              </Link>
              <Link href="/login" className="rounded-full border border-silver px-6 py-3 font-mono text-sm tracking-[1.4px]">
                LOGIN
              </Link>
            </>
          ) : null}
          {role === "SEEKER" ? (
            <Link href="/profile" className="rounded-full border border-silver px-6 py-3 font-mono text-sm tracking-[1.4px]">
              PROFILE
            </Link>
          ) : null}
          {role === "EMPLOYER" ? (
            <Link href="/dashboard" className="rounded-full border border-silver px-6 py-3 font-mono text-sm tracking-[1.4px]">
              DASHBOARD
            </Link>
          ) : null}
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
