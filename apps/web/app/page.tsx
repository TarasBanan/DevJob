import Link from "next/link";

type PagePreview = {
  title: string;
  description: string;
  href: string;
  cta: string;
};

const previews: PagePreview[] = [
  {
    title: "Каталог вакансий",
    description: "Фильтруйте вакансии по городу, типу занятости и зарплате. Есть живые карточки и переход в детали.",
    href: "/jobs",
    cta: "ОТКРЫТЬ КАТАЛОГ"
  },
  {
    title: "Профиль соискателя",
    description: "Резюме, отклики, статусы и рекомендации для дальнейших шагов в поиске работы.",
    href: "/profile",
    cta: "ПРОФИЛЬ"
  },
  {
    title: "Кабинет работодателя",
    description: "Основные HR-метрики, воронка кандидатов и оперативный обзор вакансий.",
    href: "/dashboard",
    cta: "АНАЛИТИКА"
  },
  {
    title: "Страница компании",
    description: "Публичный профиль компании: описание, стек, рейтинг и открытые позиции.",
    href: "/company/aurora-labs",
    cta: "ПРОФИЛЬ КОМПАНИИ"
  }
];

export default function HomePage(): JSX.Element {
  return (
    <section className="space-y-12">
      <div className="space-y-6">
        <h1 className="font-display text-5xl uppercase leading-[1.05] sm:text-7xl">DevJob</h1>
        <p className="max-w-2xl text-lg text-silver">
          Платформа поиска работы в IT: вакансии, отклики, профили компаний и аналитика для работодателей.
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
