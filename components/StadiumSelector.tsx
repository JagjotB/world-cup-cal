"use client";

export function StadiumSelector({
  stadiums,
  selected,
  onChange
}: {
  stadiums: string[];
  selected: string[];
  onChange: (value: string[]) => void;
}) {
  function toggle(item: string) {
    onChange(selected.includes(item) ? selected.filter((value) => value !== item) : [...selected, item]);
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink">{selected.length} stadiums selected</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => onChange(stadiums)} className="rounded-md border border-ink/15 px-3 py-2 text-sm font-semibold text-ink">
            Select all
          </button>
          <button type="button" onClick={() => onChange([])} className="rounded-md border border-ink/15 px-3 py-2 text-sm font-semibold text-ink">
            Clear all
          </button>
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {stadiums.map((item) => (
          <label key={item} className="flex min-h-12 items-center gap-3 rounded-md border border-ink/10 bg-white px-3 py-2 text-sm font-semibold text-ink">
            <input type="checkbox" checked={selected.includes(item)} onChange={() => toggle(item)} className="h-4 w-4 accent-pitch" />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}
