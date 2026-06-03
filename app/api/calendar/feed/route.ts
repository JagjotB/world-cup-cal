import { NextResponse } from "next/server";
import { generateIcsCalendar } from "@/lib/calendar/ics";
import { getRuntimeMatches } from "@/lib/fixtures";
import { getSelectedMatches, validateSelection } from "@/lib/selection";
import type { SelectionInput } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const selection: SelectionInput = {
      mode: (url.searchParams.get("mode") ?? "all") as SelectionInput["mode"],
      teams: url.searchParams.get("teams")?.split(","),
      cities: url.searchParams.get("cities")?.split(","),
      stadiums: url.searchParams.get("stadiums")?.split(",")
    };
    const validation = validateSelection(selection);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    return new Response(generateIcsCalendar(getSelectedMatches(selection, await getRuntimeMatches())), {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Cache-Control": "public, max-age=900"
      }
    });
  } catch {
    return NextResponse.json({ error: "Calendar feed generation failed." }, { status: 500 });
  }
}
