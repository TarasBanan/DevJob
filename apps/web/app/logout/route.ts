import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const response = NextResponse.redirect(new URL("/jobs", request.url));
  response.cookies.delete("accessToken");
  response.cookies.delete("role");
  return response;
}
