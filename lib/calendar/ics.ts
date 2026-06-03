import type { Match } from "@/lib/types";
import { formatMatchDescription, formatMatchLocation, formatMatchTitle } from "@/lib/calendar/formatting";

function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function toUtcIcsDate(value: string, timezone: string) {
  if (/Z$|[+-]\d{2}:\d{2}$/.test(value)) {
    return new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    const fallback = new Date(`${value}Z`);
    return fallback.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  }

  // Match fixture data is stored as local wall time. This MVP emits UTC values and
  // documents that full VTIMEZONE blocks are future work.
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).formatToParts(date);
  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const assumedLocal = Date.UTC(
    Number(lookup.year),
    Number(lookup.month) - 1,
    Number(lookup.day),
    Number(lookup.hour),
    Number(lookup.minute),
    Number(lookup.second)
  );
  const localInput = Date.UTC(
    Number(value.slice(0, 4)),
    Number(value.slice(5, 7)) - 1,
    Number(value.slice(8, 10)),
    Number(value.slice(11, 13)),
    Number(value.slice(14, 16)),
    Number(value.slice(17, 19) || "0")
  );
  const offset = assumedLocal - date.getTime();
  return new Date(localInput - offset).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export function mapMatchToIcsEvent(match: Match) {
  return [
    "BEGIN:VEVENT",
    `UID:${match.id}@world-cup-calendar`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")}`,
    `DTSTART:${toUtcIcsDate(match.startTime, match.timezone)}`,
    `DTEND:${toUtcIcsDate(match.endTime, match.timezone)}`,
    `SUMMARY:${escapeIcsText(formatMatchTitle(match))}`,
    `LOCATION:${escapeIcsText(formatMatchLocation(match))}`,
    `DESCRIPTION:${escapeIcsText(formatMatchDescription(match))}`,
    "END:VEVENT"
  ];
}

export function generateIcsCalendar(matches: Match[]) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//World Cup Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...matches.flatMap(mapMatchToIcsEvent),
    "END:VCALENDAR"
  ];
  return `${lines.join("\r\n")}\r\n`;
}

export function getIcsFilename(mode: string, values: string[] = []) {
  if (mode === "all") return "world-cup-calendar-all-matches.ics";
  if (values.length === 1) return `world-cup-calendar-${values[0].toLowerCase().replace(/[^a-z0-9]+/g, "-")}-matches.ics`;
  return "world-cup-calendar-selected-matches.ics";
}
