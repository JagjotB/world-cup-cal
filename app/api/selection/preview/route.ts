import { NextResponse } from "next/server";
import { getRuntimeMatches } from "@/lib/fixtures";
import { getSelectedMatches, validateSelection } from "@/lib/selection";
import type { SelectionInput } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as SelectionInput;
    const validation = validateSelection(input);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const selectedMatches = getSelectedMatches(input, await getRuntimeMatches());
    return NextResponse.json({ count: selectedMatches.length, matches: selectedMatches });
  } catch {
    return NextResponse.json({ error: "Invalid selection request." }, { status: 400 });
  }
}
