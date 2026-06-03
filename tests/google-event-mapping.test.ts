import { describe, expect, it } from "vitest";
import { mapMatchToGoogleCalendarEvent } from "@/lib/calendar/google";
import { matches } from "@/lib/matches";

describe("google event mapping", () => {
  it("maps summary", () => {
    expect(mapMatchToGoogleCalendarEvent(matches[0]).summary).toBe("Croatia vs Belgium - International Friendly");
  });

  it("maps location", () => {
    expect(mapMatchToGoogleCalendarEvent(matches[0]).location).toBe("Venue TBD");
  });

  it("maps description", () => {
    expect(mapMatchToGoogleCalendarEvent(matches[0]).description).toContain("Competition: International Friendly");
  });

  it("maps start/end timezone", () => {
    const event = mapMatchToGoogleCalendarEvent(matches[0]);
    expect(event.start.timeZone).toBe("Europe/London");
    expect(event.end.timeZone).toBe("Europe/London");
  });
});
