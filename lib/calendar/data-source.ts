import type { Match } from "@/lib/types";
import { normalizeTeamName } from "@/lib/team-names";

const countryByCity: Record<string, string> = {
  Atlanta: "United States",
  Boston: "United States",
  Dallas: "United States",
  Houston: "United States",
  "Kansas City": "United States",
  "Los Angeles": "United States",
  Miami: "United States",
  "New York / New Jersey": "United States",
  Philadelphia: "United States",
  "San Francisco Bay Area": "United States",
  Seattle: "United States",
  Toronto: "Canada",
  Vancouver: "Canada",
  Guadalajara: "Mexico",
  "Mexico City": "Mexico",
  Monterrey: "Mexico"
};

const timezoneByCity: Record<string, string> = {
  Atlanta: "America/New_York",
  Boston: "America/New_York",
  Dallas: "America/Chicago",
  Houston: "America/Chicago",
  "Kansas City": "America/Chicago",
  "Los Angeles": "America/Los_Angeles",
  Miami: "America/New_York",
  "New York / New Jersey": "America/New_York",
  Philadelphia: "America/New_York",
  "San Francisco Bay Area": "America/Los_Angeles",
  Seattle: "America/Los_Angeles",
  Toronto: "America/Toronto",
  Vancouver: "America/Vancouver",
  Guadalajara: "America/Mexico_City",
  "Mexico City": "America/Mexico_City",
  Monterrey: "America/Monterrey"
};

function stripTags(value: string) {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/&middot;/g, ".")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function addHours(iso: string, hours: number) {
  return new Date(new Date(iso).getTime() + hours * 60 * 60 * 1000).toISOString();
}

export function parseWorldCuplySchedule(html: string): Match[] {
  const matches: Match[] = [];
  const blocks = html.matchAll(/<div class="match" id="match-(\d+)">(.*?)<\/div>\s*<\/div>/gs);

  for (const block of blocks) {
    const matchNumber = Number(block[1]);
    const body = block[2];
    const teams = [...body.matchAll(/<span class="tn">(.*?)<\/span>/gs)].map((team) => stripTags(team[1]));
    const stage = stripTags(body.match(/<span class="round-badge[^"]*">(.*?)<\/span>/s)?.[1] ?? "");
    const startTime = body.match(/<time datetime="([^"]+)"/)?.[1];
    const venue = stripTags(body.match(/<span class="venue">(.*?)<\/span>/s)?.[1] ?? "");
    const [stadium, city] = venue.split(", ");

    if (!matchNumber || teams.length !== 2 || !stage || !startTime || !stadium || !city) {
      throw new Error(`Could not parse match ${matchNumber || "unknown"} from schedule source.`);
    }

    matches.push({
      id: `match-${String(matchNumber).padStart(3, "0")}`,
      matchNumber,
      homeTeam: normalizeTeamName(teams[0]),
      awayTeam: normalizeTeamName(teams[1]),
      stage,
      startTime: new Date(startTime).toISOString(),
      endTime: addHours(startTime, /^group\s/i.test(stage) ? 2 : 2.5),
      timezone: timezoneByCity[city],
      stadium,
      city,
      country: countryByCity[city],
      competition: "FIFA World Cup 2026",
      source: "WorldCuply",
      sourceUrl: "https://worldcuply.com/schedule.html",
      status: teams.some((team) => /Winner|Loser|Group|third/i.test(team)) ? "placeholder" : "scheduled"
    });
  }

  if (matches.length !== 104) {
    throw new Error(`Expected 104 matches from schedule source, got ${matches.length}.`);
  }

  return matches;
}

export function parseGuardianFriendlies(html: string): Match[] {
  const rows = [...html.matchAll(/<li class="dcr-(?:1vtelzf|18n74t4)">(.*?)<\/li>/gs)];
  const seen = new Set<string>();
  const matches: Omit<Match, "id" | "matchNumber">[] = [];

  for (const row of rows) {
    const body = row[1];
    const startTime = body.match(/<time dateTime="([^"]+)"/)?.[1];
    const homeTeam = stripTags(body.match(/<div class="dcr-3l4pru">(.*?)<\/div>/s)?.[1] ?? "");
    const awayTeam = stripTags(body.match(/<div class="dcr-rm7qtf">(.*?)<\/div>/s)?.[1] ?? "");
    if (!startTime || !homeTeam || !awayTeam) continue;

    const key = `${startTime}|${homeTeam}|${awayTeam}`;
    if (seen.has(key)) continue;
    seen.add(key);

    matches.push({
      homeTeam: normalizeTeamName(homeTeam),
      awayTeam: normalizeTeamName(awayTeam),
      stage: "International Friendly",
      startTime: new Date(startTime).toISOString(),
      endTime: addHours(startTime, 2),
      timezone: "Europe/London",
      stadium: "Venue TBD",
      city: "TBD",
      country: "TBD",
      competition: "International Friendly",
      source: "The Guardian",
      sourceUrl: "https://www.theguardian.com/football/friendlies/fixtures",
      status: "scheduled"
    });
  }

  if (matches.length < 29) {
    throw new Error(`Expected at least 29 friendlies from schedule source, got ${matches.length}.`);
  }

  return matches.map((match, index) => ({
    ...match,
    id: `friendly-${String(index + 1).padStart(3, "0")}`,
    matchNumber: index + 1
  }));
}
