"use client";

import Link from "next/link";
import { useState } from "react";
import { apiClient } from "@/lib/api-client";

type RegisterResult = {
  fullName: string;
  role: "SEEKER" | "EMPLOYER";
};

export default function RegisterPage(): JSX.Element {
  const [email, setEmail] = useState("candidate@example.com");
  const [fullName, setFullName] = useState("Candidate User");
  const [role, setRole] = useState<"SEEKER" | "EMPLOYER">("SEEKER");
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<RegisterResult | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError("");

    try {
      const response = await apiClient.register({ email, fullName, role });
      setResult({
        fullName: response.user.fullName,
        role: response.user.role
      });
    } catch (caughtError) {
      setResult(null);
      setError(caughtError instanceof Error ? caughtError.message : "Registration failed");
    }
  };

  return (
    <section className="mx-auto max-w-xl border border-silver/70 p-6">
      <h1 className="font-display text-4xl leading-[1.1]">Registration</h1>
      <p className="mt-2 text-silver">Create an account and continue to the relevant platform section.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          className="w-full border border-silver bg-velvet px-4 py-3 text-showroom outline-none focus:border-showroom"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          type="text"
          placeholder="Full name"
          required
        />
        <input
          className="w-full border border-silver bg-velvet px-4 py-3 text-showroom outline-none focus:border-showroom"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="Email"
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
      </form>

      {result ? (
        <div className="mt-6 space-y-4 border border-showroom p-4">
          <p className="font-mono text-xs tracking-[1.2px] text-silver">ACCOUNT CREATED</p>
          <p>User: {result.fullName}</p>
          <p>Role: {result.role}</p>
          <div className="flex gap-3">
            <Link
              href={result.role === "SEEKER" ? "/jobs" : "/dashboard"}
              className="rounded-full border border-showroom px-5 py-2 font-mono text-xs tracking-[1.2px]"
            >
              CONTINUE
            </Link>
            <Link href="/login" className="rounded-full border border-silver px-5 py-2 font-mono text-xs tracking-[1.2px]">
              LOGIN
            </Link>
          </div>
        </div>
      ) : null}

      {error ? <p className="mt-4 text-silver">{error}</p> : null}
    </section>
  );
}
