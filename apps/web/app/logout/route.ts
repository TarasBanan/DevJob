import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const cookieHeader = request.headers.get("cookie") ?? "";

  try {
    await fetch("http://localhost:4000/api/auth/logout", {
      method: "POST",
      headers: {
        cookie: cookieHeader
      },
      cache: "no-store"
    });
  } catch {
    // do nothing, local cookie cleanup still runs
  }

  const response = NextResponse.redirect(new URL("/jobs", request.url));
  response.cookies.delete("accessToken");
  response.cookies.delete("role");
  return response;
}
