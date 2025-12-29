import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { createHash } from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fid, content, category } = body;

    console.log("Incoming request:", { fid, content, category }); // Debug log

    const hashedFid = createHash("sha256")
      .update(fid.toString() + (process.env.SUPABASE_ANON_KEY || "fallback"))
      .digest("hex");

    const { data, error } = await supabase.from("posts").insert({
      user_id: hashedFid,
      content: content,
      category: category || "q-and-a",
    }).select(); // .select() helps confirm the insert worked

    if (error) {
      console.error("Supabase error detail:", error);
      return NextResponse.json({ error: error.message, code: error.code }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("API Crash:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}