"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
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
    <main className="mx-auto grid max-w-5xl gap-8 px-4 py-10">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-pitch">Build your calendar</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Choose matches</h1>
        <p className="mt-3 max-w-2xl leading-7 text-ink/70">Select teams, host cities, or stadiums. Your selection is carried in the URL where possible.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          ["teams", "Teams"],
          ["cities", "Cities"],
          ["stadiums", "Stadiums"]
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value as SelectionMode)}
            className={`rounded-md px-4 py-2 text-sm font-bold ${mode === value ? "bg-pitch text-white" : "border border-ink/15 bg-white text-ink"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <section className="rounded-lg border border-ink/10 bg-white/50 p-5">
        {mode === "teams" && <TeamSelector teams={teams} selected={selectedTeams} onChange={setSelectedTeams} />}
        {mode === "cities" && <CitySelector cities={cities} selected={selectedCities} onChange={setSelectedCities} />}
        {mode === "stadiums" && <StadiumSelector stadiums={stadiums} selected={selectedStadiums} onChange={setSelectedStadiums} />}
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-semibold text-ink">{selectedCount} selected</p>
        <button
          type="button"
          disabled={selectedCount === 0}
          onClick={continueToReview}
          className="rounded-md bg-pitch px-5 py-3 font-bold text-white shadow-soft hover:bg-ink disabled:bg-ink/25"
        >
          Continue
        </button>
      </div>
      <DisclaimerBanner />
    </main>
  );
}
