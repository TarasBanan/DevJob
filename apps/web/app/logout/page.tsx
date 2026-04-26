"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

export default function LogoutPage(): JSX.Element {
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const runLogout = async (): Promise<void> => {
      try {
        await apiClient.logout();
        document.cookie = "role=; Max-Age=0; path=/";
        window.location.assign("/jobs");
      } catch (caughtError) {
        setError(caughtError instanceof Error ? caughtError.message : "Logout failed");
      }
    };

    void runLogout();
  }, []);

  return (
    <section className="mx-auto max-w-xl border border-silver/70 p-6">
      <h1 className="font-display text-4xl leading-[1.1]">Logout</h1>
      <p className="mt-2 text-silver">Signing out...</p>
      {error ? <p className="mt-4 text-silver">{error}</p> : null}
    </section>
  );
}
