import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/middleware";

const PUBLIC_ROUTES = ["/login", "/auth/callback", "/prelaunch"];
const isLaunched = process.env.NEXT_PUBLIC_IS_LAUNCHED === "true";

export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse } = createClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Set security headers
  const response = supabaseResponse;
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );

  // --- Pre-launch gate ---
  // When NOT launched: redirect everything (except /prelaunch itself) to /prelaunch
  if (!isLaunched) {
    if (pathname !== "/prelaunch") {
      const url = request.nextUrl.clone();
      url.pathname = "/prelaunch";
      return NextResponse.redirect(url);
    }
    return response;
  }

  // --- Post-launch: normal auth flow ---
  // Redirect /prelaunch → /login (prelaunch page no longer needed)
  if (pathname === "/prelaunch") {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Authenticated user trying to access login → redirect to homepage
  if (user && pathname === "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Unauthenticated user trying to access protected route
  if (!user && !PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.svg|assets/).*)",
  ],
};
