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
      <p className="text-silver">Отклики: {applicationsCount}</p>
      <div className="border border-silver/70 p-5 text-silver">Загрузка резюме и история откликов доступны после авторизации.</div>
    </section>
  );
}
