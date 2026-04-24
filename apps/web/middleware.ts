import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest): NextResponse {
  const token = request.cookies.get("accessToken")?.value;
  const roleCookie = request.cookies.get("role")?.value;
  const role = token ? roleCookie : undefined;
  const path = request.nextUrl.pathname;

  if (!role && (path.startsWith("/profile") || path.startsWith("/dashboard") || path.startsWith("/vacancies"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (role === "SEEKER" && (path.startsWith("/dashboard") || path.startsWith("/vacancies"))) {
    return NextResponse.redirect(new URL("/jobs", request.url));
  }

  if (role === "EMPLOYER" && path.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*", "/vacancies/:path*"]
};
