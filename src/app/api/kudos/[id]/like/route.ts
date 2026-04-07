import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: kudosId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error: likeError } = await supabase
    .from("kudos_likes")
    .insert({ kudos_id: kudosId, user_id: user.id });

  if (likeError) {
    if (likeError.code === "23505") {
      return NextResponse.json({ error: "Already liked" }, { status: 409 });
    }
    return NextResponse.json({ error: likeError.message }, { status: 500 });
  }

  // Get current count and increment
  const { data: post } = await supabase
    .from("kudos_posts")
    .select("like_count")
    .eq("id", kudosId)
    .single();

  const newCount = (post?.like_count || 0) + 1;
  await supabase
    .from("kudos_posts")
    .update({ like_count: newCount })
    .eq("id", kudosId);

  return NextResponse.json({ likeCount: newCount });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: kudosId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await supabase
    .from("kudos_likes")
    .delete()
    .eq("kudos_id", kudosId)
    .eq("user_id", user.id);

  const { data: post } = await supabase
    .from("kudos_posts")
    .select("like_count")
    .eq("id", kudosId)
    .single();

  return NextResponse.json({ likeCount: Math.max((post?.like_count || 0) - 1, 0) });
}
