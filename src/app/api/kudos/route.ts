import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const cursor = searchParams.get("cursor");
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  let query = supabase
    .from("kudos_posts")
    .select(
      `
      id,
      message,
      category,
      hashtags,
      image_urls,
      is_highlighted,
      like_count,
      created_at,
      sender:user_profiles!kudos_posts_sender_id_fkey(id, full_name, avatar_url, department_code, department_name, badge_type),
      receiver:user_profiles!kudos_posts_receiver_id_fkey(id, full_name, avatar_url, department_code, department_name, badge_type)
    `
    )
    .order("created_at", { ascending: false })
    .limit(limit + 1);

  if (cursor) {
    // Fix: URL decoding converts + to space, restore timezone offset
    const decodedCursor = cursor.replace(" ", "+");
    query = query.lt("created_at", decodedCursor);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const hasMore = (data?.length || 0) > limit;
  const posts = (data || []).slice(0, limit).map((post) => ({
    id: post.id,
    sender: post.sender,
    receiver: post.receiver,
    message: post.message,
    category: post.category,
    hashtags: post.hashtags || [],
    imageUrls: post.image_urls || [],
    isHighlighted: post.is_highlighted,
    likeCount: post.like_count,
    createdAt: post.created_at,
  }));

  const nextCursor = hasMore ? posts[posts.length - 1]?.createdAt : null;

  return NextResponse.json({ data: posts, nextCursor });
}
