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
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "20";
  const pageNumber = parseInt(page, 10);
  const limit = parseInt(pageSize, 10);
  const offset = (pageNumber - 1) * limit;

  try {
    const { data, error, count } = await supabase
      .from("tweet_interactions")
      .select(
        `
        *,
        tweets:tweets(*)
      `,
        { count: "exact" }
      )
      .eq("user_id", userId)
      .order("sort_index", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    const processedData = data.map((item) => {
      const { tweets, ...rest } = item;
      return { ...tweets, ...rest };
    });

    return NextResponse.json({
      data: processedData,
      page: pageNumber,
      pageSize: limit,
      totalCount: count,
    });
  } catch (error) {
    console.error("Error fetching tweet interactions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
