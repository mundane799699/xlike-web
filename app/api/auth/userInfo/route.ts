import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return NextResponse.json(data);
}
