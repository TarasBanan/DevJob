import { apiClient } from "@/lib/api-client";

type CompanyPageProps = {
  params: {
    slug: string;
  };
};

export default async function CompanyPage({ params }: CompanyPageProps): Promise<JSX.Element> {
  const company = await apiClient.getCompany(params.slug);

  return (
    <section className="space-y-6">
      <h1 className="font-display text-5xl leading-[1.05]">{company.name}</h1>
      <p className="text-silver">{company.about}</p>
      <p className="font-mono text-sm tracking-[1.2px] text-silver">RATING: {company.rating}</p>
      <div className="flex flex-wrap gap-2">
        {company.stack.map((item) => (
          <span key={item} className="rounded-full border border-silver px-3 py-1 font-mono text-xs tracking-[1.2px]">
            {item.toUpperCase()}
          </span>
        ))}
      </div>
    </section>
  );
}
