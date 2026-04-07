import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=server_error`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    const errorCode =
      error.message === "access_denied" ? "access_denied" : "server_error";
    return NextResponse.redirect(`${origin}/login?error=${errorCode}`);
  }

  return NextResponse.redirect(`${origin}/`);
}
