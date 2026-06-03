import { NextResponse } from "next/server";
import { generateIcsCalendar, getIcsFilename } from "@/lib/calendar/ics";
import { getRuntimeMatches } from "@/lib/fixtures";
import { getSelectedMatches, normalizeSelection, validateSelection } from "@/lib/selection";
import type { SelectionInput } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as SelectionInput;
    const validation = validateSelection(input);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const selection = normalizeSelection(input);
    const selectedMatches = getSelectedMatches(selection, await getRuntimeMatches());
    const body = generateIcsCalendar(selectedMatches);
    const values = selection.teams ?? selection.cities ?? selection.stadiums ?? [];
    return new Response(body, {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="${getIcsFilename(selection.mode, values)}"`
      }
    });
  } catch {
    return NextResponse.json({ error: "Calendar generation failed." }, { status: 500 });
  }
}
