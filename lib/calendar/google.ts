import type { Match } from "@/lib/types";
import { formatMatchDescription, formatMatchLocation, formatMatchTitle } from "@/lib/calendar/formatting";

export function mapMatchToGoogleCalendarEvent(match: Match) {
  return {
    summary: formatMatchTitle(match),
    location: formatMatchLocation(match),
    description: formatMatchDescription(match),
    start: {
      dateTime: match.startTime,
      timeZone: match.timezone
    },
    end: {
      dateTime: match.endTime,
      timeZone: match.timezone
    },
    extendedProperties: {
      private: {
        worldCupCalMatchId: match.id
      }
    }
  };
}
