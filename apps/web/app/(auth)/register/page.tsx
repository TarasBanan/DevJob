"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";

export default function RegisterPage(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState("candidate@example.com");
  const [fullName, setFullName] = useState("Candidate User");
  const [role, setRole] = useState<"SEEKER" | "EMPLOYER">("SEEKER");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError("");

    try {
      await apiClient.register({ email, fullName, role });
      router.push(role === "SEEKER" ? "/jobs" : "/dashboard");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Registration failed");
    }
  };

  return (
    <section className="mx-auto max-w-xl border border-silver/70 p-6">
      <h1 className="font-display text-4xl leading-[1.1]">Регистрация</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          className="w-full border border-silver bg-velvet px-4 py-3 text-showroom outline-none focus:border-showroom"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          type="text"
          required
        />
        <input
          className="w-full border border-silver bg-velvet px-4 py-3 text-showroom outline-none focus:border-showroom"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          required
        />
        <select
          className="w-full border border-silver bg-velvet px-4 py-3 text-showroom outline-none focus:border-showroom"
          value={role}
          onChange={(event) => setRole(event.target.value === "EMPLOYER" ? "EMPLOYER" : "SEEKER")}
        >
          <option value="SEEKER">SEEKER</option>
          <option value="EMPLOYER">EMPLOYER</option>
        </select>
        <button className="rounded-full border border-showroom px-6 py-3 font-mono text-sm tracking-[1.4px]" type="submit">
          REGISTER
        </button>
        {error ? <p className="text-silver">{error}</p> : null}
      </form>
    </section>
  );
}
