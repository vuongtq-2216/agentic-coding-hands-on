import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

const PRIZES = [
  "Nhận được 1 áo phông SAA",
  "Nhận được 1 ly cà phê Starbucks",
  "Nhận được 1 voucher Grab 100K",
  "Nhận được 1 voucher CGV 200K",
  "Nhận được 1 voucher ăn trưa 150K",
  "Nhận được 1 sticker pack SAA 2025",
];

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find first unopened box
  const { data: box, error: findError } = await supabase
    .from("secret_boxes")
    .select("id")
    .eq("user_id", user.id)
    .eq("is_opened", false)
    .limit(1)
    .single();

  if (findError || !box) {
    return NextResponse.json(
      { error: "Không còn Secret Box nào để mở" },
      { status: 404 }
    );
  }

  const prize = PRIZES[Math.floor(Math.random() * PRIZES.length)];

  const { data: updated, error: updateError } = await supabase
    .from("secret_boxes")
    .update({
      is_opened: true,
      prize_description: prize,
      opened_at: new Date().toISOString(),
    })
    .eq("id", box.id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json(updated);
}
