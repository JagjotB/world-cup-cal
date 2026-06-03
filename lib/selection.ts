import { matches } from "@/lib/matches";
import type { Match, SelectionInput } from "@/lib/types";

function normalizeList(values?: string[]) {
  return (values ?? [])
    .flatMap((value) => value.split(","))
    .map((value) => value.trim())
    .filter(Boolean);
}

function includesAny(values: string[], candidates: string[]) {
  const wanted = new Set(values.map((value) => value.toLowerCase()));
  return candidates.some((candidate) => wanted.has(candidate.toLowerCase()));
}

export function filterMatchesByTeams(source: Match[], teams: string[]) {
  return source.filter((match) => includesAny(teams, [match.homeTeam, match.awayTeam]));
}

export function filterMatchesByCities(source: Match[], cities: string[]) {
  return source.filter((match) => includesAny(cities, [match.city]));
}

export function filterMatchesByStadiums(source: Match[], stadiums: string[]) {
  return source.filter((match) => includesAny(stadiums, [match.stadium]));
}

export function normalizeSelection(input: SelectionInput): SelectionInput {
  return {
    mode: input.mode,
    teams: normalizeList(input.teams),
    cities: normalizeList(input.cities),
    stadiums: normalizeList(input.stadiums)
  };
}

export function validateSelection(input: SelectionInput) {
  const selection = normalizeSelection(input);
  if (!["all", "teams", "cities", "stadiums"].includes(selection.mode)) {
    return { valid: false, error: "Invalid selection mode." };
  }
  if (selection.mode === "teams" && !selection.teams?.length) {
    return { valid: false, error: "Choose at least one team." };
  }
  if (selection.mode === "cities" && !selection.cities?.length) {
    return { valid: false, error: "Choose at least one city." };
  }
  if (selection.mode === "stadiums" && !selection.stadiums?.length) {
    return { valid: false, error: "Choose at least one stadium." };
  }
  return { valid: true, error: null };
}

export function getSelectedMatches(input: SelectionInput, source = matches) {
  const selection = normalizeSelection(input);
  if (selection.mode === "all") return source;
  if (selection.mode === "teams") return filterMatchesByTeams(source, selection.teams ?? []);
  if (selection.mode === "cities") return filterMatchesByCities(source, selection.cities ?? []);
  return filterMatchesByStadiums(source, selection.stadiums ?? []);
}

export function selectionToSearchParams(input: SelectionInput) {
  const selection = normalizeSelection(input);
  const params = new URLSearchParams({ mode: selection.mode });
  if (selection.teams?.length) params.set("teams", selection.teams.join(","));
  if (selection.cities?.length) params.set("cities", selection.cities.join(","));
  if (selection.stadiums?.length) params.set("stadiums", selection.stadiums.join(","));
  return params.toString();
}

export function selectionFromSearchParams(params: URLSearchParams): SelectionInput {
  return {
    mode: (params.get("mode") ?? "all") as SelectionInput["mode"],
    teams: normalizeList(params.get("teams")?.split(",")),
    cities: normalizeList(params.get("cities")?.split(",")),
    stadiums: normalizeList(params.get("stadiums")?.split(","))
  };
}
