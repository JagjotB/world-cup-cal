import { describe, expect, it } from "vitest";
import { formatMatchDescription, formatMatchLocation, formatMatchTitle } from "@/lib/calendar/formatting";
import { matches } from "@/lib/matches";

describe("calendar formatting", () => {
  it("formats known teams title", () => {
    expect(formatMatchTitle(matches[0])).toBe("Croatia vs Belgium - International Friendly");
  });

  it("formats World Cup title", () => {
    const worldCupMatch = matches.find((match) => match.competition === "FIFA World Cup 2026");
    expect(worldCupMatch && formatMatchTitle(worldCupMatch)).toBe("Mexico vs South Africa - World Cup");
  });

  it("formats location", () => {
    expect(formatMatchLocation(matches[0])).toBe("Venue TBD");
  });

  it("description contains disclaimer", () => {
    expect(formatMatchDescription(matches[0])).toContain("unofficial fan-made calendar event");
  });
});
