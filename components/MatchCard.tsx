import { CalendarDays, MapPin } from "lucide-react";
import { formatMatchDateTime, formatMatchLocation, formatMatchTitle } from "@/lib/calendar/formatting";
import type { Match } from "@/lib/types";

export function MatchCard({ match }: { match: Match }) {
  return (
    <article className="rounded-lg border border-ink/10 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-pitch">Match {match.matchNumber}</p>
          <h3 className="mt-1 text-lg font-bold text-ink">{formatMatchTitle(match)}</h3>
        </div>
          <span className="rounded-md bg-skysoft px-2 py-1 text-xs font-semibold text-ink">{match.competition === "FIFA World Cup 2026" ? match.stage : match.competition}</span>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-ink/75">
        <p className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-clay" />
          {formatMatchDateTime(match)} <span className="text-ink/45">({match.timezone})</span>
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-clay" />
          {formatMatchLocation(match)}
        </p>
      </div>
    </article>
  );
}
