"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState("candidate@example.com");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError("");

    try {
      await apiClient.login({ email });
      router.push("/jobs");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Login failed");
    }
  };

  return (
    <section className="mx-auto max-w-xl border border-silver/70 p-6">
      <h1 className="font-display text-4xl leading-[1.1]">Вход</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          className="w-full border border-silver bg-velvet px-4 py-3 text-showroom outline-none focus:border-showroom"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          required
        />
        <button className="rounded-full border border-showroom px-6 py-3 font-mono text-sm tracking-[1.4px]" type="submit">
          LOGIN
        </button>
        {error ? <p className="text-silver">{error}</p> : null}
      </form>
    </section>
  );
}
