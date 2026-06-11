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
      <label className="flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search teams"
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
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
      <p className="text-sm font-semibold text-muted-foreground">{selectedCount} selected</p>
      <div className="flex gap-2">
        <button type="button" onClick={onSelectAll} className="rounded-full border border-white/15 px-3 py-2 text-xs font-semibold hover:border-gold/40 hover:text-gold">
          Select all
        </button>
        <button type="button" onClick={onClear} className="rounded-full border border-white/15 px-3 py-2 text-xs font-semibold hover:border-gold/40 hover:text-gold">
          Clear all
        </button>
      </div>
    </div>
  );
}

function CheckboxRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 py-2 text-sm font-semibold transition ${checked ? "border-gold/40 bg-gold/10 text-gold" : "border-white/10 bg-white/[0.03] hover:border-gold/30"}`}>
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-[#d9ad55]" />
      {label}
    </label>
  );
}
