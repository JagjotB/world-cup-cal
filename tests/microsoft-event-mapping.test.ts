import { describe, expect, it } from "vitest";
import { mapMatchToMicrosoftCalendarEvent } from "@/lib/calendar/microsoft";
import { matches } from "@/lib/matches";

describe("microsoft event mapping", () => {
  it("maps match details for Microsoft Graph", () => {
    const event = mapMatchToMicrosoftCalendarEvent(matches[0]);

    expect(event.subject).toBe("Croatia vs Belgium - International Friendly");
    expect(event.location.displayName).toBe("Venue TBD");
    expect(event.body.content).toContain("Competition: International Friendly");
    expect(event.transactionId).toBe("world-cup-cal-friendly-001");
  });

  it("sends absolute UTC times to avoid mailbox timezone differences", () => {
    const event = mapMatchToMicrosoftCalendarEvent(matches[0]);

    expect(event.start).toEqual({
      dateTime: "2026-06-02T16:00:00",
      timeZone: "UTC"
    });
    expect(event.end).toEqual({
      dateTime: "2026-06-02T18:00:00",
      timeZone: "UTC"
    });
  });
});
