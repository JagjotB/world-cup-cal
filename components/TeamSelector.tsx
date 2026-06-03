"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

export function TeamSelector({
  teams,
  selected,
  onChange
}: {
  teams: string[];
  selected: string[];
  onChange: (value: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => teams.filter((team) => team.toLowerCase().includes(query.toLowerCase())), [teams, query]);

  function toggle(team: string) {
    onChange(selected.includes(team) ? selected.filter((value) => value !== team) : [...selected, team]);
  }

  return (
    <div className="grid gap-4">
      <label className="flex items-center gap-2 rounded-md border border-ink/10 bg-white px-3 py-2">
        <Search className="h-4 w-4 text-ink/50" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search teams"
          className="w-full bg-transparent text-sm outline-none"
        />
      </label>
      <SelectorToolbar selectedCount={selected.length} onSelectAll={() => onChange(teams)} onClear={() => onChange([])} />
      <div className="grid gap-2 sm:grid-cols-2">
        {filtered.map((team) => (
          <CheckboxRow key={team} label={team} checked={selected.includes(team)} onChange={() => toggle(team)} />
        ))}
      </div>
    </div>
  );
}

function SelectorToolbar({ selectedCount, onSelectAll, onClear }: { selectedCount: number; onSelectAll: () => void; onClear: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm font-semibold text-ink">{selectedCount} selected</p>
      <div className="flex gap-2">
        <button type="button" onClick={onSelectAll} className="rounded-md border border-ink/15 px-3 py-2 text-sm font-semibold text-ink">
          Select all
        </button>
        <button type="button" onClick={onClear} className="rounded-md border border-ink/15 px-3 py-2 text-sm font-semibold text-ink">
          Clear all
        </button>
      </div>
    </div>
  );
}

function CheckboxRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex min-h-12 items-center gap-3 rounded-md border border-ink/10 bg-white px-3 py-2 text-sm font-semibold text-ink">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-pitch" />
      {label}
    </label>
  );
}
