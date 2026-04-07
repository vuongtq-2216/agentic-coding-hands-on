import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "5", 10);
  const hashtag = searchParams.get("hashtag");
  // department filter reserved for future use

  let query = supabase
    .from("kudos_posts")
    .select(
      `id, message, category, hashtags, image_urls, is_highlighted, like_count, created_at,
       sender:user_profiles!kudos_posts_sender_id_fkey(id, full_name, avatar_url, department_code, department_name, badge_type),
       receiver:user_profiles!kudos_posts_receiver_id_fkey(id, full_name, avatar_url, department_code, department_name, badge_type)`,
      { count: "exact" }
    )
    .eq("is_highlighted", true)
    .order("created_at", { ascending: false });

  if (hashtag) {
    query = query.contains("hashtags", [hashtag]);
  }

  const offset = (page - 1) * limit;
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const totalPages = Math.ceil((count || 0) / limit);

  const posts = (data || []).map((p) => ({
    id: p.id,
    sender: p.sender,
    receiver: p.receiver,
    message: p.message,
    category: p.category,
    hashtags: p.hashtags || [],
    imageUrls: p.image_urls || [],
    isHighlighted: p.is_highlighted,
    likeCount: p.like_count,
    createdAt: p.created_at,
  }));

  return NextResponse.json({ data: posts, totalPages, currentPage: page });
}
