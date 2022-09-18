// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const url = req.nextUrl;
  const loginUrl = new URL("/", req.url);
  const dashboard = new URL("/dashboard/listado", req.url);

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(loginUrl);
  }

  if (token && url.pathname === '/') {
    return NextResponse.redirect(dashboard);
  }
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/dashboard/:path",
// };
