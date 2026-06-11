import { ReviewClient } from "@/app/review/review-client";
import { MatchCard } from "@/components/MatchCard";
import { getRuntimeMatches } from "@/lib/fixtures";
import { getAppBaseUrl, isGoogleConfigured } from "@/lib/utils";
import { getSelectedMatches, normalizeSelection } from "@/lib/selection";
import type { SelectionInput } from "@/lib/types";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ReviewPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const mode = (typeof params.mode === "string" ? params.mode : "all") as SelectionInput["mode"];
  const selection = normalizeSelection({
    mode,
    teams: typeof params.teams === "string" ? params.teams.split(",") : undefined,
    cities: typeof params.cities === "string" ? params.cities.split(",") : undefined,
    stadiums: typeof params.stadiums === "string" ? params.stadiums.split(",") : undefined
  });
  const selectedMatches = getSelectedMatches(selection, await getRuntimeMatches());
  const selectedFilters =
    selection.mode === "all"
      ? ["All matches"]
      : selection.mode === "teams"
        ? selection.teams ?? []
        : selection.mode === "cities"
          ? selection.cities ?? []
          : selection.stadiums ?? [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-hero">
      <div className="absolute inset-0 pitch-lines opacity-15 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:px-8 lg:py-20">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">Step 2 of 3 · Review</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{selectedMatches.length} matches selected</h1>
        <p className="mt-4 text-muted-foreground">Download an .ics file or copy a live calendar feed. No account required.</p>
      </div>

      <section className="rounded-2xl border border-gold/30 bg-gold/[0.06] p-6 shadow-glow">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">Selected mode</p>
        <h2 className="mt-2 text-xl font-bold capitalize">{selection.mode}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedFilters.map((filter) => (
            <span key={filter} className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">{filter}</span>
          ))}
        </div>
      </section>

      <ReviewClient selection={selection} appBaseUrl={getAppBaseUrl()} googleConfigured={isGoogleConfigured()} />

      <section>
        <h2 className="text-2xl font-bold">Selected matches</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {selectedMatches.map((match) => <MatchCard key={match.id} match={match} />)}
        </div>
      </section>
      </div>
    </main>
  );
}
