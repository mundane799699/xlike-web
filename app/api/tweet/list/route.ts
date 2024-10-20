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
  const searchTerm = searchParams.get("searchTerm") || "";
  const screenName = searchParams.get("screenName") || "";
  const sortColumn = searchParams.get("sortColumn") || "sort_index";
  const sortOrder = searchParams.get("sortOrder") || "DESC";
  const pageNumber = parseInt(page, 10);
  const limit = parseInt(pageSize, 10);
  const offset = (pageNumber - 1) * limit;

  try {
    const { data, error } = await supabase.rpc("search_tweets", {
      p_user_id: userId,
      p_search_term: searchTerm,
      p_screen_name: screenName,
      p_offset: offset,
      p_limit: limit,
      p_sort_column: sortColumn,
      p_sort_order: sortOrder,
    });

    if (error) throw error;

    return NextResponse.json({
      data,
      page: pageNumber,
      pageSize: limit,
      hasMore: data.length === limit,
    });
  } catch (error) {
    console.error("Error fetching tweet interactions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
