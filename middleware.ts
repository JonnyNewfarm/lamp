// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE_NAME = "calero_admin_key";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const cookieKey = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (cookieKey !== adminKey) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};