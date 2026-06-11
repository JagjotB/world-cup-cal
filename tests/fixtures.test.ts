import { describe, expect, it } from "vitest";
import { matches, teams } from "@/lib/matches";
import { getTeamsFromMatches } from "@/lib/team-names";

describe("verified fixture baseline", () => {
  it("contains the complete 104-match World Cup schedule", () => {
    expect(matches.filter((match) => match.competition === "FIFA World Cup 2026")).toHaveLength(104);
  });

  it("keeps verified kickoff corrections", () => {
    expect(matches.find((match) => match.id === "match-029")?.startTime).toBe("2026-06-20T00:30:00Z");
    expect(matches.find((match) => match.id === "friendly-014")?.startTime).toBe("2026-06-06T14:00:00Z");
    expect(matches.find((match) => match.id === "friendly-029")).toMatchObject({
      homeTeam: "Argentina",
      awayTeam: "Iceland",
      startTime: "2026-06-10T01:00:00Z"
    });
  });

  it("does not expose duplicate aliases in the team picker", () => {
    expect(teams).toContain("United States");
    expect(teams).toContain("Côte d’Ivoire");
    expect(teams).not.toContain("USA");
    expect(teams).not.toContain("Ivory Coast");
  });

  it("builds selector options only from teams with fixtures", () => {
    const selectorTeams = getTeamsFromMatches(matches);
    expect(selectorTeams).toEqual(teams);
    expect(
      selectorTeams.every((team) =>
        matches.some((match) => [match.homeTeam, match.awayTeam].includes(team))
      )
    ).toBe(true);
  });

  it("normalizes source aliases before creating selector options", () => {
    const withAliases = matches.map((match) =>
      match.id === "match-004"
        ? { ...match, homeTeam: "USA" }
        : match.id === "match-009"
          ? { ...match, homeTeam: "Ivory Coast" }
          : match
    );

    const selectorTeams = getTeamsFromMatches(withAliases);
    expect(selectorTeams).toContain("United States");
    expect(selectorTeams).toContain("Côte d’Ivoire");
    expect(selectorTeams).not.toContain("USA");
    expect(selectorTeams).not.toContain("Ivory Coast");
  });
});
