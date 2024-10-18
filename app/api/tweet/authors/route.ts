import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const searchParams = req.nextUrl.searchParams;
  let userId = searchParams.get("userId");
  if (!userId) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user.id;
  }
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  try {
    const { data, error } = await supabase
      .from("tweet_author")
      .select("screen_name, username, avatar_url")
      .eq("user_id", userId);

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching tweet interactions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
