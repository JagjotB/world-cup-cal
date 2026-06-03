import { NextResponse } from "next/server";
import { getRuntimeTeams } from "@/lib/fixtures";

export const dynamic = "force-dynamic";

export async function GET() {
  const teams = await getRuntimeTeams();
  return NextResponse.json({ teams });
}
