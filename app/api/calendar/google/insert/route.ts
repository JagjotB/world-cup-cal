import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { mapMatchToGoogleCalendarEvent } from "@/lib/calendar/google";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getRuntimeMatches } from "@/lib/fixtures";
import { getSelectedMatches, validateSelection } from "@/lib/selection";
import type { GoogleInsertItem, SelectionInput } from "@/lib/types";
import { formatMatchTitle } from "@/lib/calendar/formatting";
import { isGoogleConfigured } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isGoogleConfigured()) {
    return NextResponse.json(
      { error: "Google direct insert is not configured in this deployment. You can still use .ics download or calendar feed." },
      { status: 503 }
    );
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must sign in with Google first." }, { status: 401 });
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
    where: { userId: session.user.id, provider: "google" }
  });

  if (!account?.access_token) {
    return NextResponse.json({ error: "Google Calendar permission is missing. Please sign in again." }, { status: 401 });
  }

  const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
  oauth2Client.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token ?? undefined,
    expiry_date: account.expires_at ? account.expires_at * 1000 : undefined
  });
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const added: GoogleInsertItem[] = [];
  const skipped: GoogleInsertItem[] = [];
  const failed: GoogleInsertItem[] = [];

  for (const match of getSelectedMatches(input, await getRuntimeMatches())) {
    const title = formatMatchTitle(match);
    const existing = await prisma.calendarSync.findUnique({
      where: {
        userId_matchId_provider: {
          userId: session.user.id,
          matchId: match.id,
          provider: "google"
        }
      }
    });

    if (existing) {
      skipped.push({ matchId: match.id, title, reason: "Already added" });
      continue;
    }

    try {
      const response = await calendar.events.insert({
        calendarId: "primary",
        requestBody: mapMatchToGoogleCalendarEvent(match)
      });
      const providerEventId = response.data.id;
      if (!providerEventId) throw new Error("Google Calendar did not return an event ID.");
      await prisma.calendarSync.create({
        data: {
          userId: session.user.id,
          matchId: match.id,
          provider: "google",
          providerEventId,
          selectionMode: input.mode
        }
      });
      added.push({ matchId: match.id, title, providerEventId });
    } catch {
      failed.push({ matchId: match.id, title, reason: "Google API error" });
    }
  }

  return NextResponse.json({ added, skipped, failed });
}
