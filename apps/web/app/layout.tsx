import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/shared/site-shell";

export const metadata: Metadata = {
  title: "DevJob",
  description: "DevJob — IT job platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
