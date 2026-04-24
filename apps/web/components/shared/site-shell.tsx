import type { ReactNode } from "react";
import Link from "next/link";

type SiteShellProps = {
  children: ReactNode;
};

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/jobs", label: "JOBS" },
  { href: "/profile", label: "PROFILE" },
  { href: "/dashboard", label: "DASHBOARD" },
  { href: "/vacancies", label: "VACANCIES" }
];

export const SiteShell = ({ children }: SiteShellProps): JSX.Element => {
  return (
    <div className="min-h-screen bg-velvet text-showroom">
      <header className="border-b border-silver/70 px-4 py-4 sm:px-8">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <Link href="/" className="font-mono text-sm tracking-[1.4px]">
            DEVJOB
          </Link>
          <div className="flex gap-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="font-mono text-xs tracking-[1.2px] text-silver">
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-8">{children}</main>
    </div>
  );
};
