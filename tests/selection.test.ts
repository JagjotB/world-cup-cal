import { describe, expect, it } from "vitest";
import { getSelectedMatches, validateSelection } from "@/lib/selection";
import { matches } from "@/lib/matches";

describe("selection", () => {
  it("all mode returns all matches", () => {
    expect(getSelectedMatches({ mode: "all" })).toHaveLength(matches.length);
  });

  it("team mode returns matching teams", () => {
    const selected = getSelectedMatches({ mode: "teams", teams: ["Croatia"] });
    expect(selected.every((match) => [match.homeTeam, match.awayTeam].includes("Croatia"))).toBe(true);
  });

  it("multi-team mode returns matches for either team", () => {
    const selected = getSelectedMatches({ mode: "teams", teams: ["Croatia", "Canada"] });
    expect(selected.some((match) => match.homeTeam === "Croatia" || match.awayTeam === "Croatia")).toBe(true);
    expect(selected.some((match) => match.homeTeam === "Canada" || match.awayTeam === "Canada")).toBe(true);
  });

  it("city mode filters correctly", () => {
    expect(getSelectedMatches({ mode: "cities", cities: ["TBD"] }).every((match) => match.city === "TBD")).toBe(true);
  });

  it("stadium mode filters correctly", () => {
    expect(getSelectedMatches({ mode: "stadiums", stadiums: ["Venue TBD"] }).every((match) => match.stadium === "Venue TBD")).toBe(true);
  });

  it("invalid empty team selection fails", () => {
    expect(validateSelection({ mode: "teams", teams: [] })).toEqual({ valid: false, error: "Choose at least one team." });
  });
});
