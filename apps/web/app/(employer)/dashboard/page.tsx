import Link from "next/link";

export default function DashboardPage(): JSX.Element {
  return (
    <section className="space-y-6">
      <h1 className="font-display text-5xl leading-[1.05]">HR Analytics</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Просмотры", value: "1 280" },
          { label: "Отклики", value: "214" },
          { label: "Конверсия", value: "16.7%" }
        ].map((item) => (
          <article key={item.label} className="border border-silver/70 p-5">
            <p className="font-mono text-xs tracking-[1.2px] text-silver">{item.label.toUpperCase()}</p>
            <p className="mt-2 font-display text-4xl leading-[1.05]">{item.value}</p>
          </article>
        ))}
      </div>

      <div className="border border-silver/70 p-5">
        <p className="font-mono text-xs tracking-[1.2px] text-silver">КОНТЕНТ ДАШБОРДА</p>
        <p className="mt-2 text-silver">Блоки воронки кандидатов, источники трафика и эффективность вакансий будут публиковаться здесь.</p>
        <Link href="/vacancies" className="mt-4 inline-block rounded-full border border-showroom px-5 py-2 font-mono text-xs tracking-[1.2px]">
          УПРАВЛЕНИЕ ВАКАНСИЯМИ
        </Link>
      </div>
    </section>
  );
}
