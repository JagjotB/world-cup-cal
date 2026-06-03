import { NextResponse } from "next/server";
import { getRuntimeMatches } from "@/lib/fixtures";

export const dynamic = "force-dynamic";

export async function GET() {
  const matches = await getRuntimeMatches();
  return NextResponse.json({ matches });
}
