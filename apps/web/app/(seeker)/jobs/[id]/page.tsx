import { apiClient } from "@/lib/api-client";

type JobDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function JobDetailPage({ params }: JobDetailPageProps): Promise<JSX.Element> {
  const job = await apiClient.getJob(params.id);

  return (
    <section className="space-y-6">
      <h1 className="font-display text-5xl leading-[1.05]">{job.title}</h1>
      <p className="text-silver">{job.description}</p>
      <ul className="list-disc space-y-2 pl-6 text-silver">
        {job.requirements.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button className="rounded-full border border-showroom px-6 py-3 font-mono text-sm tracking-[1.4px]">APPLY</button>
    </section>
  );
}
