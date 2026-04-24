import Link from "next/link";

export default function HomePage(): JSX.Element {
  return (
    <section className="space-y-12">
      <div className="space-y-6">
        <h1 className="font-display text-5xl uppercase leading-[1.05] sm:text-7xl">DevJob</h1>
        <p className="max-w-2xl text-lg text-silver">
          Платформа поиска работы в IT: каталог вакансий, профиль соискателя, кабинет работодателя, аналитика откликов.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/jobs" className="rounded-full border border-showroom px-6 py-3 font-mono text-sm tracking-[1.4px]">
            EXPLORE JOBS
          </Link>
          <Link href="/register" className="rounded-full border border-silver px-6 py-3 font-mono text-sm tracking-[1.4px]">
            CREATE ACCOUNT
          </Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          "Главная",
          "Каталог вакансий",
          "Страница вакансии",
          "Профиль соискателя",
          "Кабинет работодателя",
          "Страница компании",
          "Аналитика (HR)",
          "Авторизация"
        ].map((item) => (
          <div key={item} className="border border-silver/70 p-4">
            <p className="font-display text-2xl leading-[1.1]">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
