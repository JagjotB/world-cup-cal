import { prisma } from "@/lib/db";
import { cities as staticCities, matches as staticMatches, stadiums as staticStadiums, teams as staticTeams } from "@/lib/matches";
import type { Match } from "@/lib/types";

function dbMatchToMatch(match: {
  id: string;
  matchNumber: number;
  homeTeam: string;
  awayTeam: string;
  stage: string;
  startTime: Date;
  endTime: Date;
  timezone: string;
  stadium: string;
  city: string;
  country: string;
  competition: string;
  source: string;
  sourceUrl: string;
  status: string;
}): Match {
  return {
    id: match.id,
    matchNumber: match.matchNumber,
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    stage: match.stage,
    startTime: match.startTime.toISOString(),
    endTime: match.endTime.toISOString(),
    timezone: match.timezone,
    stadium: match.stadium,
    city: match.city,
    country: match.country,
    competition: match.competition,
    source: match.source,
    sourceUrl: match.sourceUrl,
    status: match.status === "placeholder" ? "placeholder" : "scheduled"
  };
}

export async function getRuntimeMatches() {
  try {
    const dbMatches = await prisma.match.findMany({ orderBy: { matchNumber: "asc" } });
    if (dbMatches.length > 0) return dbMatches.map(dbMatchToMatch);
  } catch {
    return staticMatches;
  }

  return staticMatches;
}

export async function getRuntimeTeams() {
  const runtimeMatches = await getRuntimeMatches();
  if (runtimeMatches.length === 0) return staticTeams;
  return Array.from(new Set(runtimeMatches.flatMap((match) => [match.homeTeam, match.awayTeam]).filter((team) => !/Winner|Loser|Group|third/i.test(team)))).sort();
}

export async function getRuntimeCities() {
  const runtimeMatches = await getRuntimeMatches();
  if (runtimeMatches.length === 0) return staticCities;
  return Array.from(new Set(runtimeMatches.map((match) => match.city))).sort();
}

export async function getRuntimeStadiums() {
  const runtimeMatches = await getRuntimeMatches();
  if (runtimeMatches.length === 0) return staticStadiums;
  return Array.from(new Set(runtimeMatches.map((match) => match.stadium))).sort();
}
