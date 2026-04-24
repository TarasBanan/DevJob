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
      <h1 className="font-display text-5xl leading-[1.05]">Профиль соискателя</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <article className="border border-silver/70 p-5">
          <p className="font-mono text-xs tracking-[1.2px] text-silver">ОТКЛИКИ</p>
          <p className="mt-2 font-display text-4xl leading-[1.05]">{applicationsCount}</p>
        </article>
        <article className="border border-silver/70 p-5">
          <p className="font-mono text-xs tracking-[1.2px] text-silver">РЕЗЮМЕ</p>
          <p className="mt-2 text-silver">resume.pdf (placeholder)</p>
        </article>
        <article className="border border-silver/70 p-5">
          <p className="font-mono text-xs tracking-[1.2px] text-silver">СТАТУС</p>
          <p className="mt-2 text-silver">Open to work</p>
        </article>
      </div>

      <div className="border border-silver/70 p-5">
        <p className="font-mono text-xs tracking-[1.2px] text-silver">ПУБЛИКУЕМЫЙ КОНТЕНТ</p>
        <p className="mt-2 text-silver">
          Здесь выводятся история откликов, файлы резюме и рекомендации вакансий. Сейчас заполнено базовыми заглушками.
        </p>
        <Link href="/jobs" className="mt-4 inline-block rounded-full border border-showroom px-5 py-2 font-mono text-xs tracking-[1.2px]">
          К ВАКАНСИЯМ
        </Link>
      </div>
    </section>
  );
}
