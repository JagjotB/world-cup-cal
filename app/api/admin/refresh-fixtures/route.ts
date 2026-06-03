import { NextResponse } from "next/server";
import { parseGuardianFriendlies, parseWorldCuplySchedule } from "@/lib/calendar/data-source";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function isAuthorized(request: Request) {
  const configuredSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  const providedSecret = request.headers.get("x-cron-secret");

  return Boolean(
    configuredSecret &&
      (providedSecret === configuredSecret || authHeader === `Bearer ${configuredSecret}`)
  );
}

async function refreshFixtures(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized fixture refresh." }, { status: 401 });
  }

  const worldCupSourceUrl = process.env.FIXTURE_SOURCE_URL;
  const friendliesSourceUrl = process.env.FRIENDLIES_SOURCE_URL;
  if (!worldCupSourceUrl || !friendliesSourceUrl) {
    return NextResponse.json({ error: "FIXTURE_SOURCE_URL and FRIENDLIES_SOURCE_URL must be configured." }, { status: 500 });
  }

  const [worldCupResponse, friendliesResponse] = await Promise.all([
    fetch(worldCupSourceUrl, { cache: "no-store" }),
    fetch(friendliesSourceUrl, { cache: "no-store" })
  ]);
  if (!worldCupResponse.ok || !friendliesResponse.ok) {
    return NextResponse.json({ error: "Fixture source fetch failed." }, { status: 502 });
  }

  const matches = [
    ...parseGuardianFriendlies(await friendliesResponse.text()),
    ...parseWorldCuplySchedule(await worldCupResponse.text())
  ];
  const incomingIds = matches.map((match) => match.id);

  await prisma.match.deleteMany({
    where: {
      id: {
        notIn: incomingIds
      }
    }
  });

  for (const match of matches) {
    await prisma.match.upsert({
      where: { id: match.id },
      update: {
        matchNumber: match.matchNumber,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        stage: match.stage,
        startTime: new Date(match.startTime),
        endTime: new Date(match.endTime),
        timezone: match.timezone,
        stadium: match.stadium,
        city: match.city,
        country: match.country,
        competition: match.competition,
        source: match.source,
        sourceUrl: match.sourceUrl,
        status: match.status
      },
      create: {
        id: match.id,
        matchNumber: match.matchNumber,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        stage: match.stage,
        startTime: new Date(match.startTime),
        endTime: new Date(match.endTime),
        timezone: match.timezone,
        stadium: match.stadium,
        city: match.city,
        country: match.country,
        competition: match.competition,
        source: match.source,
        sourceUrl: match.sourceUrl,
        status: match.status
      }
    });
  }

  return NextResponse.json({ count: matches.length, refreshedAt: new Date().toISOString() });
}

export async function GET(request: Request) {
  return refreshFixtures(request);
}

export async function POST(request: Request) {
  return refreshFixtures(request);
}
