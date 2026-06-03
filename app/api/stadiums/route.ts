import { NextResponse } from "next/server";
import { getRuntimeStadiums } from "@/lib/fixtures";

export const dynamic = "force-dynamic";

export async function GET() {
  const stadiums = await getRuntimeStadiums();
  return NextResponse.json({ stadiums });
}
