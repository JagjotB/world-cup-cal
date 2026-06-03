import { describe, expect, it } from "vitest";
import { generateIcsCalendar } from "@/lib/calendar/ics";
import { matches } from "@/lib/matches";

describe("ics", () => {
  it("calendar starts with BEGIN:VCALENDAR", () => {
    expect(generateIcsCalendar([matches[0]]).startsWith("BEGIN:VCALENDAR")).toBe(true);
  });

  it("includes VEVENT", () => {
    expect(generateIcsCalendar([matches[0]])).toContain("BEGIN:VEVENT");
  });

  it("includes stable UID", () => {
    expect(generateIcsCalendar([matches[0]])).toContain("UID:friendly-001@world-cup-calendar");
  });

  it("escapes text correctly", () => {
    const ics = generateIcsCalendar([{ ...matches[0], stadium: "A, B; C\\D" }]);
    expect(ics).toContain("LOCATION:A\\, B\\; C\\\\D\\, Toronto\\, Canada");
  });

  it("includes all selected matches", () => {
    const ics = generateIcsCalendar(matches.slice(0, 3));
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(3);
  });
});
