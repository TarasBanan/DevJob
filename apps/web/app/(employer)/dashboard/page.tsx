import Link from "next/link";

export default function DashboardPage(): JSX.Element {
  return (
    <section className="space-y-6">
      <h1 className="font-display text-5xl leading-[1.05]">HR Analytics</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Views", value: "1 280" },
          { label: "Applications", value: "214" },
          { label: "Conversion", value: "16.7%" }
        ].map((item) => (
          <article key={item.label} className="border border-silver/70 p-5">
            <p className="font-mono text-xs tracking-[1.2px] text-silver">{item.label.toUpperCase()}</p>
            <p className="mt-2 font-display text-4xl leading-[1.05]">{item.value}</p>
          </article>
        ))}
      </div>

      <div className="border border-silver/70 p-5">
        <p className="font-mono text-xs tracking-[1.2px] text-silver">DASHBOARD CONTENT</p>
        <p className="mt-2 text-silver">Candidate funnel blocks, traffic sources, and vacancy efficiency modules will be published here.</p>
        <Link href="/vacancies" className="mt-4 inline-block rounded-full border border-showroom px-5 py-2 font-mono text-xs tracking-[1.2px]">
          MANAGE VACANCIES
        </Link>
      </div>
    </section>
  );
}
