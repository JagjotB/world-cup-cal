import type { Match } from "@/lib/types";

const aliases: Record<string, string> = {
  usa: "United States",
  "ivory coast": "Côte d’Ivoire"
};

export function normalizeTeamName(team: string) {
  const trimmed = team.trim();
  return aliases[trimmed.toLowerCase()] ?? trimmed;
}

export function isConcreteTeam(team: string) {
  return !/^(?:winner|loser|group|runner-up|3rd|third)\b/i.test(team.trim());
}

export function getTeamsFromMatches(matches: Match[]) {
  return Array.from(
    new Set(
      matches
        .flatMap((match) => [match.homeTeam, match.awayTeam])
        .map(normalizeTeamName)
        .filter(isConcreteTeam)
    )
  ).sort((a, b) => a.localeCompare(b));
}
