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
        <section key={label as string} className="rounded-lg border border-ink/10 bg-white p-4">
          <p className="text-3xl font-black text-ink">{(items as GoogleInsertItem[]).length}</p>
          <h3 className="mt-1 font-bold text-ink">{label as string}</h3>
          <ul className="mt-3 grid gap-2 text-sm text-ink/70">
            {(items as GoogleInsertItem[]).map((item) => (
              <li key={item.matchId}>{item.title}{item.reason ? ` - ${item.reason}` : ""}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
