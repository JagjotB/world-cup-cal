import type { Match } from "@/lib/types";

export const disclaimer =
  "World Cup Calendar is an unofficial fan-made calendar tool and is not affiliated with FIFA, the World Cup, Google, Microsoft, Apple, or any tournament organizer. Match details should be verified with official sources.";

export function formatMatchTitle(match: Match) {
  if (match.competition !== "FIFA World Cup 2026") {
    return `${match.homeTeam} vs ${match.awayTeam} - ${match.competition}`;
  }

  if (match.homeTeam === "TBD" || match.awayTeam === "TBD") {
    return `World Cup Match ${match.matchNumber}: ${match.homeTeam} vs ${match.awayTeam}`;
  }
  return `${match.homeTeam} vs ${match.awayTeam} - World Cup`;
}

export function formatMatchLocation(match: Match) {
  if (match.stadium === "Venue TBD" || match.city === "TBD" || match.country === "TBD") {
    return "Venue TBD";
  }

  return `${match.stadium}, ${match.city}, ${match.country}`;
}

export function formatMatchDescription(match: Match) {
  return [
    "Added by World Cup Calendar.",
    "",
    `Competition: ${match.competition}`,
    `Stage: ${match.stage}`,
    `Match number: ${match.matchNumber}`,
    "",
    "This is an unofficial fan-made calendar event. Please verify official match details before attending.",
    "",
    "World Cup Calendar is not affiliated with FIFA, Google, Microsoft, Apple, or any tournament organizer."
  ].join("\n");
}

export function formatMatchDateTime(match: Match) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: match.timezone
  }).format(new Date(match.startTime));
}
