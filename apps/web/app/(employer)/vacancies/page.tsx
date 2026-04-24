import Link from "next/link";

const draftVacancies = [
  { title: "Backend Engineer", status: "DRAFT" },
  { title: "Senior Recruiter", status: "PUBLISHED" },
  { title: "Frontend Engineer", status: "CLOSED" }
];

export default function VacanciesPage(): JSX.Element {
  return (
    <section className="space-y-6">
      <h1 className="font-display text-5xl leading-[1.05]">Vacancies</h1>
      <p className="text-silver">Публикуемый контент: список вакансий работодателя и статусы по каждой позиции.</p>
      <div className="space-y-3">
        {draftVacancies.map((item) => (
          <article key={item.title} className="border border-silver/70 p-4">
            <p className="font-display text-2xl leading-[1.1]">{item.title}</p>
            <p className="mt-2 font-mono text-xs tracking-[1.2px] text-silver">{item.status}</p>
          </article>
        ))}
      </div>
      <div className="flex gap-3">
        <Link href="/dashboard" className="rounded-full border border-showroom px-5 py-2 font-mono text-xs tracking-[1.2px]">
          К АНАЛИТИКЕ
        </Link>
        <Link href="/jobs" className="rounded-full border border-silver px-5 py-2 font-mono text-xs tracking-[1.2px]">
          К ПУБЛИЧНОМУ КАТАЛОГУ
        </Link>
      </div>
    </section>
  );
}
