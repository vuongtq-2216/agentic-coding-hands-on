import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q") || "";
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  if (query.length < 2) {
    return NextResponse.json([]);
  }

  const { data, error } = await supabase
    .from("user_profiles")
    .select("id, full_name, avatar_url, department_code, department_name, badge_type")
    .ilike("full_name", `%${query}%`)
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const users = (data || []).map((u) => ({
    id: u.id,
    fullName: u.full_name,
    avatarUrl: u.avatar_url,
    departmentCode: u.department_code,
    departmentName: u.department_name,
    badgeType: u.badge_type,
  }));

  return NextResponse.json(users);
}
