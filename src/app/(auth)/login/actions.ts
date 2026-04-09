"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/libs/supabase/server";

export async function loginWithGoogle() {
  const supabase = await createClient();
  const headersList = await headers();

  // Build origin from host header (works on both local and Cloudflare Workers)
  const host = headersList.get("x-forwarded-host") || headersList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const origin = `${protocol}://${host}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error || !data.url) {
    redirect("/login?error=server_error");
  }

  redirect(data.url);
}
