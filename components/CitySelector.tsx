"use client";

export function CitySelector({
  cities,
  selected,
  onChange
}: {
  cities: string[];
  selected: string[];
  onChange: (value: string[]) => void;
}) {
  return <SimpleSelector items={cities} selected={selected} onChange={onChange} selectedLabel="cities" />;
}

function SimpleSelector({
  items,
  selected,
  onChange,
  selectedLabel
}: {
  items: string[];
  selected: string[];
  onChange: (value: string[]) => void;
  selectedLabel: string;
}) {
  function toggle(item: string) {
    onChange(selected.includes(item) ? selected.filter((value) => value !== item) : [...selected, item]);
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-muted-foreground">{selected.length} {selectedLabel} selected</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => onChange(items)} className="rounded-full border border-white/15 px-3 py-2 text-xs font-semibold hover:border-gold/40 hover:text-gold">
            Select all
          </button>
          <button type="button" onClick={() => onChange([])} className="rounded-full border border-white/15 px-3 py-2 text-xs font-semibold hover:border-gold/40 hover:text-gold">
            Clear all
          </button>
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <label key={item} className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 py-2 text-sm font-semibold transition ${selected.includes(item) ? "border-gold/40 bg-gold/10 text-gold" : "border-white/10 bg-white/[0.03] hover:border-gold/30"}`}>
            <input type="checkbox" checked={selected.includes(item)} onChange={() => toggle(item)} className="h-4 w-4 accent-[#d9ad55]" />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}
