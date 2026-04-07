"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/libs/supabase/server";

export async function loginWithGoogle() {
  const supabase = await createClient();
  const headersList = await headers();
  const origin = headersList.get("origin") || "";

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
