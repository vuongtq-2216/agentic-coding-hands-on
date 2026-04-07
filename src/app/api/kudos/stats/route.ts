import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = user.id;

  // Count kudos received
  const { count: kudosReceived } = await supabase
    .from("kudos_posts")
    .select("*", { count: "exact", head: true })
    .eq("receiver_id", userId);

  // Count kudos sent
  const { count: kudosSent } = await supabase
    .from("kudos_posts")
    .select("*", { count: "exact", head: true })
    .eq("sender_id", userId);

  // Count total likes on received posts
  const { data: receivedPosts } = await supabase
    .from("kudos_posts")
    .select("like_count")
    .eq("receiver_id", userId);

  const heartsReceived = (receivedPosts || []).reduce(
    (sum, p) => sum + (p.like_count || 0),
    0
  );

  // Count secret boxes
  const { count: secretBoxesOpened } = await supabase
    .from("secret_boxes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_opened", true);

  const { count: secretBoxesRemaining } = await supabase
    .from("secret_boxes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_opened", false);

  return NextResponse.json({
    kudosReceived: kudosReceived || 0,
    kudosSent: kudosSent || 0,
    heartsReceived,
    heartsMultiplier: 2,
    secretBoxesOpened: secretBoxesOpened || 0,
    secretBoxesRemaining: secretBoxesRemaining || 0,
  });
}
