import matchesData from "@/data/matches.json";
import teamsData from "@/data/teams.json";
import citiesData from "@/data/cities.json";
import stadiumsData from "@/data/stadiums.json";
import type { Match } from "@/lib/types";

export const matches = matchesData as Match[];
export const teams = teamsData as string[];
export const cities = citiesData as string[];
export const stadiums = stadiumsData as string[];

export function getMatchById(id: string) {
  return matches.find((match) => match.id === id);
}
