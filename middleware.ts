import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("adels_session")?.value;

  const pathname = request.nextUrl.pathname;

  // صفحات مسموحة بدون تسجيل دخول
  const paginasPublicas = [
    "/login",
  ];

  // إذا الصفحة عامة، اسمح بالدخول
  if (paginasPublicas.includes(pathname)) {
    return NextResponse.next();
  }

  // إذا ما في جلسة دخول، رجعه إلى Login
  if (!session) {
    const loginUrl = new URL("/login", request.url);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};