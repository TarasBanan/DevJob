"use client";

import { useState } from "react";
import { apiClient } from "@/lib/api-client";

export default function RegisterPage(): JSX.Element {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handlePlaceholder = async (): Promise<void> => {
    setError("");
    try {
      const response = await apiClient.registerPlaceholder();
      setMessage(response.message);
    } catch (caughtError) {
      setMessage("");
      setError(caughtError instanceof Error ? caughtError.message : "Request failed");
    }
  };

  return (
    <section className="mx-auto max-w-xl border border-silver/70 p-6">
      <h1 className="font-display text-4xl leading-[1.1]">Registration</h1>
      <p className="mt-2 text-silver">Demo mode: registration is intentionally disabled for this prototype.</p>
      <button onClick={handlePlaceholder} className="mt-6 rounded-full border border-showroom px-6 py-3 font-mono text-sm tracking-[1.4px]" type="button">
        CHECK DEMO MODE MESSAGE
      </button>
      {message ? <p className="mt-4 text-silver">{message}</p> : null}
      {error ? <p className="mt-4 text-silver">{error}</p> : null}
    </section>
  );
}
