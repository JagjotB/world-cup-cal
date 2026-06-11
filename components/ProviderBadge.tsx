import { cx } from "@/lib/utils";

export function ProviderBadge({ label, tone = "neutral" }: { label: string; tone?: "neutral" | "recommended" | "disabled" }) {
  return (
    <span
      className={cx(
        "inline-flex rounded-md px-2 py-1 text-xs font-semibold",
        tone === "recommended" && "border border-gold/30 bg-gold/10 text-gold",
        tone === "disabled" && "border border-white/10 bg-white/[0.04] text-muted-foreground",
        tone === "neutral" && "border border-white/15 bg-white/[0.08] text-foreground"
      )}
    >
      {label}
    </span>
  );
}
