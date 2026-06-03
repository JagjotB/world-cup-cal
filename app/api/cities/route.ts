import { NextResponse } from "next/server";
import { getRuntimeCities } from "@/lib/fixtures";

export const dynamic = "force-dynamic";

export async function GET() {
  const cities = await getRuntimeCities();
  return NextResponse.json({ cities });
}
