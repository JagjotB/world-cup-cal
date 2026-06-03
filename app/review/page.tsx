import { ReviewClient } from "@/app/review/review-client";
import { MatchCard } from "@/components/MatchCard";
import { getRuntimeMatches } from "@/lib/fixtures";
import { getAppBaseUrl, isGoogleConfigured } from "@/lib/utils";
import { getSelectedMatches, normalizeSelection } from "@/lib/selection";
import type { SelectionInput } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ReviewPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const mode = (typeof searchParams.mode === "string" ? searchParams.mode : "all") as SelectionInput["mode"];
  const selection = normalizeSelection({
    mode,
    teams: typeof searchParams.teams === "string" ? searchParams.teams.split(",") : undefined,
    cities: typeof searchParams.cities === "string" ? searchParams.cities.split(",") : undefined,
    stadiums: typeof searchParams.stadiums === "string" ? searchParams.stadiums.split(",") : undefined
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
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-pitch">Review</p>
        <h1 className="mt-2 text-4xl font-black text-ink">{selectedMatches.length} matches selected</h1>
        <p className="mt-3 leading-7 text-ink/70">Fastest option: download an .ics file or copy a calendar feed URL. No account required.</p>
      </div>

      <section className="rounded-lg border border-ink/10 bg-white p-5">
        <p className="text-sm font-bold uppercase tracking-wide text-pitch">Selected mode</p>
        <h2 className="mt-1 text-xl font-black capitalize text-ink">{selection.mode}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedFilters.map((filter) => (
            <span key={filter} className="rounded-md bg-skysoft px-2 py-1 text-sm font-semibold text-ink">{filter}</span>
          ))}
        </div>
      </section>

      <ReviewClient selection={selection} appBaseUrl={getAppBaseUrl()} googleConfigured={isGoogleConfigured()} />

      <section>
        <h2 className="text-2xl font-black text-ink">Match preview</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {selectedMatches.map((match) => <MatchCard key={match.id} match={match} />)}
        </div>
      </section>
    </main>
  );
}
