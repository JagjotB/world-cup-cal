"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Link from "next/link";
import { CitySelector } from "@/components/CitySelector";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { StadiumSelector } from "@/components/StadiumSelector";
import { TeamSelector } from "@/components/TeamSelector";
import { selectionToSearchParams } from "@/lib/selection";
import type { SelectionMode } from "@/lib/types";

export function SelectClient({
  initialMode,
  initialTeams,
  initialCities,
  initialStadiums,
  teams,
  cities,
  stadiums
}: {
  initialMode: SelectionMode;
  initialTeams: string[];
  initialCities: string[];
  initialStadiums: string[];
  teams: string[];
  cities: string[];
  stadiums: string[];
}) {
  const router = useRouter();
  const [mode, setMode] = useState<SelectionMode>(initialMode === "all" ? "teams" : initialMode);
  const [selectedTeams, setSelectedTeams] = useState(initialTeams);
  const [selectedCities, setSelectedCities] = useState(initialCities);
  const [selectedStadiums, setSelectedStadiums] = useState(initialStadiums);

  const selectedCount = useMemo(() => {
    if (mode === "teams") return selectedTeams.length;
    if (mode === "cities") return selectedCities.length;
    return selectedStadiums.length;
  }, [mode, selectedTeams.length, selectedCities.length, selectedStadiums.length]);

  function continueToReview() {
    const query = selectionToSearchParams({ mode, teams: selectedTeams, cities: selectedCities, stadiums: selectedStadiums });
    router.push(`/review?${query}`);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-hero pb-28">
      <div className="absolute inset-0 pitch-lines opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="relative mx-auto grid max-w-5xl gap-8 px-5 py-14 lg:px-8 lg:py-20">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">Step 1 of 3</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Build your match calendar</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Choose every match or filter by the teams, cities, and stadiums you care about.</p>
      </div>

      <section className="rounded-2xl border border-gold/30 bg-gold/[0.06] p-6 shadow-glow">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">Fastest</p>
            <h2 className="mt-2 text-2xl font-bold">Add every match</h2>
            <p className="mt-1 text-sm text-muted-foreground">The complete schedule, from opening match through the final.</p>
          </div>
          <Link href="/review?mode=all" className="inline-flex h-11 items-center justify-center rounded-full bg-cta px-5 text-sm font-semibold text-gold-foreground shadow-glow">
            Add all matches
          </Link>
        </div>
      </section>

      <div className="flex w-fit flex-wrap gap-2 rounded-full border border-white/10 bg-black/30 p-1">
        {[
          ["teams", "Teams"],
          ["cities", "Cities"],
          ["stadiums", "Stadiums"]
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value as SelectionMode)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${mode === value ? "bg-gold text-gold-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <section className="rounded-3xl border border-white/10 bg-glass p-5 shadow-card sm:p-8">
        {mode === "teams" && <TeamSelector teams={teams} selected={selectedTeams} onChange={setSelectedTeams} />}
        {mode === "cities" && <CitySelector cities={cities} selected={selectedCities} onChange={setSelectedCities} />}
        {mode === "stadiums" && <StadiumSelector stadiums={stadiums} selected={selectedStadiums} onChange={setSelectedStadiums} />}
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-6">
        <p className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 font-mono text-xs font-semibold text-gold">{selectedCount} selected</p>
        <button
          type="button"
          disabled={selectedCount === 0}
          onClick={continueToReview}
          className="rounded-full bg-cta px-6 py-3 text-sm font-semibold text-gold-foreground shadow-glow transition hover:-translate-y-0.5 disabled:opacity-40"
        >
          Review calendar →
        </button>
      </div>
      <DisclaimerBanner />
      </div>
    </main>
  );
}
