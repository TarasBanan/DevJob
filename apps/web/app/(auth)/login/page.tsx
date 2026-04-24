"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiClient } from "@/lib/api-client";

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState("seeker@devjob.com");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError("");

    try {
      const response = await apiClient.login({ email, password });
      router.push(response.user.role === "EMPLOYER" ? "/dashboard" : "/jobs");
      router.refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? "Invalid credentials" : "Login failed");
    }
  };

  return (
    <section className="mx-auto max-w-xl border border-silver/70 p-6">
      <h1 className="font-display text-4xl leading-[1.1]">Login</h1>
      <p className="mt-2 text-silver">Use demo accounts to test role-based navigation and protected pages.</p>
      <p className="mt-2 text-silver">Seeker: seeker@devjob.com / 123 · Employer: employer@devjob.com / 123</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          className="w-full border border-silver bg-velvet px-4 py-3 text-showroom outline-none focus:border-showroom"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="Email"
          required
        />
        <input
          className="w-full border border-silver bg-velvet px-4 py-3 text-showroom outline-none focus:border-showroom"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          placeholder="Password"
          required
        />
        <button className="rounded-full border border-showroom px-6 py-3 font-mono text-sm tracking-[1.4px]" type="submit">
          LOGIN
        </button>
      </form>

      {error ? <p className="mt-4 text-silver">{error}</p> : null}
    </section>
  );
}
