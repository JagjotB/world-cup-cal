import { cx } from "@/lib/utils";

export function ProviderBadge({ label, tone = "neutral" }: { label: string; tone?: "neutral" | "recommended" | "disabled" }) {
  return (
    <span
      className={cx(
        "inline-flex rounded-md px-2 py-1 text-xs font-semibold",
        tone === "recommended" && "bg-lime text-ink",
        tone === "disabled" && "bg-ink/10 text-ink/60",
        tone === "neutral" && "bg-skysoft text-ink"
      )}
    >
      {label}
    </span>
  );
}
