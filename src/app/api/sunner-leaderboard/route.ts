import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("secret_boxes")
    .select(
      `
      user_id,
      prize_description,
      opened_at,
      user:user_profiles!secret_boxes_user_id_fkey(id, full_name, avatar_url)
    `
    )
    .eq("is_opened", true)
    .not("prize_description", "is", null)
    .order("opened_at", { ascending: false })
    .limit(10);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const entries = (data || []).map((box) => {
    const user = box.user as unknown as { full_name: string; avatar_url: string | null } | null;
    return {
      userId: box.user_id,
      fullName: user?.full_name || "Unknown",
      avatarUrl: user?.avatar_url || null,
      prizeDescription: box.prize_description || "",
      awardedAt: box.opened_at,
    };
  });

  return NextResponse.json(entries);
}
