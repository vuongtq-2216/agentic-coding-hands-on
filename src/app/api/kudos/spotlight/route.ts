import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { count: totalKudos } = await supabase
    .from("kudos_posts")
    .select("*", { count: "exact", head: true });

  const { data: posts } = await supabase
    .from("kudos_posts")
    .select("sender_id, receiver_id");

  const { data: profiles } = await supabase
    .from("user_profiles")
    .select("id, full_name, avatar_url");

  const nodeMap = new Map<string, { userId: string; name: string; avatarUrl: string | null }>();
  const edgeMap = new Map<string, { from: string; to: string; weight: number }>();

  for (const profile of profiles || []) {
    nodeMap.set(profile.id, {
      userId: profile.id,
      name: profile.full_name,
      avatarUrl: profile.avatar_url,
    });
  }

  for (const post of posts || []) {
    const key = `${post.sender_id}-${post.receiver_id}`;
    const existing = edgeMap.get(key);
    if (existing) {
      existing.weight += 1;
    } else {
      edgeMap.set(key, { from: post.sender_id, to: post.receiver_id, weight: 1 });
    }
  }

  const nodes = Array.from(nodeMap.values()).map((n, i) => ({
    ...n,
    x: Math.cos((i / nodeMap.size) * Math.PI * 2) * 200 + 300,
    y: Math.sin((i / nodeMap.size) * Math.PI * 2) * 200 + 200,
  }));

  return NextResponse.json({
    totalKudos: totalKudos || 0,
    nodes,
    edges: Array.from(edgeMap.values()),
  });
}
