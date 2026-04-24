export default function VacanciesPage(): JSX.Element {
  return (
    <section className="space-y-6">
      <h1 className="font-display text-5xl leading-[1.05]">Vacancies</h1>
      <div className="border border-silver/70 p-5 text-silver">
        Создавайте вакансии через API endpoint <code>POST /api/jobs</code> от имени EMPLOYER.
      </div>
    </section>
  );
}
