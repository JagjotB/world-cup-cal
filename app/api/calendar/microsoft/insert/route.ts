import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { formatMatchTitle } from "@/lib/calendar/formatting";
import { getMicrosoftAccessToken, mapMatchToMicrosoftCalendarEvent } from "@/lib/calendar/microsoft";
import { prisma } from "@/lib/db";
import { getRuntimeMatches } from "@/lib/fixtures";
import { getSelectedMatches, validateSelection } from "@/lib/selection";
import type { CalendarInsertItem, SelectionInput } from "@/lib/types";
import { isMicrosoftConfigured } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isMicrosoftConfigured()) {
    return NextResponse.json(
      { error: "Microsoft direct insert is not configured in this deployment. You can still use .ics download or calendar feed." },
      { status: 503 }
    );
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must sign in with Microsoft first." }, { status: 401 });
  }

  let input: SelectionInput;
  try {
    input = (await request.json()) as SelectionInput;
  } catch {
    return NextResponse.json({ error: "Invalid selection request." }, { status: 400 });
  }

  const validation = validateSelection(input);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const account = await prisma.account.findFirst({
    where: { userId: session.user.id, provider: "azure-ad" }
  });

  if (!account) {
    return NextResponse.json({ error: "Microsoft Calendar permission is missing. Please sign in again." }, { status: 401 });
  }

  let accessToken: string;
  try {
    accessToken = await getMicrosoftAccessToken(account);
  } catch {
    return NextResponse.json({ error: "Microsoft authorization expired. Please sign in again." }, { status: 401 });
  }

  const added: CalendarInsertItem[] = [];
  const skipped: CalendarInsertItem[] = [];
  const failed: CalendarInsertItem[] = [];

  for (const match of getSelectedMatches(input, await getRuntimeMatches())) {
    const title = formatMatchTitle(match);
    const existing = await prisma.calendarSync.findUnique({
      where: {
        userId_matchId_provider: {
          userId: session.user.id,
          matchId: match.id,
          provider: "microsoft"
        }
      }
    });

    if (existing) {
      skipped.push({ matchId: match.id, title, reason: "Already added" });
      continue;
    }

    try {
      const response = await fetch("https://graph.microsoft.com/v1.0/me/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(mapMatchToMicrosoftCalendarEvent(match))
      });
      const event = (await response.json()) as { id?: string };
      if (!response.ok || !event.id) throw new Error("Microsoft Graph did not create the event.");

      await prisma.calendarSync.create({
        data: {
          userId: session.user.id,
          matchId: match.id,
          provider: "microsoft",
          providerEventId: event.id,
          selectionMode: input.mode
        }
      });
      added.push({ matchId: match.id, title, providerEventId: event.id });
    } catch {
      failed.push({ matchId: match.id, title, reason: "Microsoft Graph API error" });
    }
  }

  return NextResponse.json({ added, skipped, failed });
}
