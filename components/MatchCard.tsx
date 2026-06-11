import { CalendarDays, MapPin } from "lucide-react";
import { formatMatchDateTime, formatMatchLocation, formatMatchTitle } from "@/lib/calendar/formatting";
import type { Match } from "@/lib/types";

export function MatchCard({ match }: { match: Match }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-glass p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">Match {match.matchNumber}</p>
          <h3 className="mt-2 text-lg font-bold">{formatMatchTitle(match)}</h3>
        </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{match.competition === "FIFA World Cup 2026" ? match.stage : match.competition}</span>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-clay" />
          {formatMatchDateTime(match)} <span className="opacity-60">({match.timezone})</span>
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-clay" />
          {formatMatchLocation(match)}
        </p>
      </div>
    </article>
  );
}
