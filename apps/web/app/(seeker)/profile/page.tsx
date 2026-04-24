import Link from "next/link";
import { apiClient } from "@/lib/api-client";

export default async function ProfilePage(): Promise<JSX.Element> {
  let applicationsCount = 0;

  try {
    const applications = await apiClient.listMyApplications();
    applicationsCount = applications.total;
  } catch {
    applicationsCount = 0;
  }

  return (
    <section className="space-y-6">
      <h1 className="font-display text-5xl leading-[1.05]">Seeker Profile</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <article className="border border-silver/70 p-5">
          <p className="font-mono text-xs tracking-[1.2px] text-silver">APPLICATIONS</p>
          <p className="mt-2 font-display text-4xl leading-[1.05]">{applicationsCount}</p>
        </article>
        <article className="border border-silver/70 p-5">
          <p className="font-mono text-xs tracking-[1.2px] text-silver">RESUME</p>
          <p className="mt-2 text-silver">resume.pdf (placeholder)</p>
        </article>
        <article className="border border-silver/70 p-5">
          <p className="font-mono text-xs tracking-[1.2px] text-silver">STATUS</p>
          <p className="mt-2 text-silver">Open to work</p>
        </article>
      </div>

      <div className="border border-silver/70 p-5">
        <p className="font-mono text-xs tracking-[1.2px] text-silver">PUBLISHABLE CONTENT</p>
        <p className="mt-2 text-silver">
          Application history, resume files, and vacancy recommendations will be shown here. Currently populated with baseline placeholders.
        </p>
        <Link href="/jobs" className="mt-4 inline-block rounded-full border border-showroom px-5 py-2 font-mono text-xs tracking-[1.2px]">
          TO VACANCIES
        </Link>
      </div>
    </section>
  );
}
