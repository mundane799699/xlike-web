import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  let { userId, id } = await req.json();
  if (!id) {
    return NextResponse.json(
      { error: "Tweet ID is required" },
      { status: 400 }
    );
  }

  if (!userId) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user.id;
  }
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("tweet_interactions")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(
    { message: "Tweet deleted", code: 200 },
    { status: 200 }
  );
}
