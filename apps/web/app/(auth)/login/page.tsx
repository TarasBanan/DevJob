"use client";

import Link from "next/link";
import { useState } from "react";
import { apiClient } from "@/lib/api-client";

type LoginResult = {
  fullName: string;
  role: "SEEKER" | "EMPLOYER";
};

export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState("candidate@example.com");
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<LoginResult | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError("");

    try {
      const response = await apiClient.login({ email });
      setResult({
        fullName: response.user.fullName,
        role: response.user.role
      });
    } catch (caughtError) {
      setResult(null);
      setError(caughtError instanceof Error ? caughtError.message : "Login failed");
    }
  };

  return (
    <section className="mx-auto max-w-xl border border-silver/70 p-6">
      <h1 className="font-display text-4xl leading-[1.1]">Вход</h1>
      <p className="mt-2 text-silver">Войдите в существующий аккаунт и продолжите работу с платформой.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          className="w-full border border-silver bg-velvet px-4 py-3 text-showroom outline-none focus:border-showroom"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="Email"
          required
        />
        <button className="rounded-full border border-showroom px-6 py-3 font-mono text-sm tracking-[1.4px]" type="submit">
          LOGIN
        </button>
      </form>

      {result ? (
        <div className="mt-6 space-y-4 border border-showroom p-4">
          <p className="font-mono text-xs tracking-[1.2px] text-silver">AUTHENTICATED</p>
          <p>Пользователь: {result.fullName}</p>
          <p>Роль: {result.role}</p>
          <Link
            href={result.role === "SEEKER" ? "/jobs" : "/dashboard"}
            className="inline-block rounded-full border border-showroom px-5 py-2 font-mono text-xs tracking-[1.2px]"
          >
            ПЕРЕЙТИ В РАЗДЕЛ
          </Link>
        </div>
      ) : null}

      {error ? (
        <p className="mt-4 text-silver">
          {error}. <Link href="/register" className="underline">Создать аккаунт</Link>
        </p>
      ) : null}
    </section>
  );
}
