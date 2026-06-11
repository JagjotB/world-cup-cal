import type { GoogleInsertItem } from "@/lib/types";

export function ResultSummary({
  added,
  skipped,
  failed
}: {
  added: GoogleInsertItem[];
  skipped: GoogleInsertItem[];
  failed: GoogleInsertItem[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[
        ["Added", added],
        ["Skipped", skipped],
        ["Failed", failed]
      ].map(([label, items]) => (
        <section key={label as string} className="rounded-2xl border border-white/10 bg-glass p-5 shadow-card">
          <p className="text-3xl font-black text-gold">{(items as GoogleInsertItem[]).length}</p>
          <h3 className="mt-1 font-bold">{label as string}</h3>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
            {(items as GoogleInsertItem[]).map((item) => (
              <li key={item.matchId}>{item.title}{item.reason ? ` - ${item.reason}` : ""}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
