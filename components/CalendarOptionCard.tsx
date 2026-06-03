import type { ReactNode } from "react";
import { ProviderBadge } from "@/components/ProviderBadge";
import { cx } from "@/lib/utils";

export function CalendarOptionCard({
  title,
  label,
  description,
  children,
  disabled = false,
  recommended = false
}: {
  title: string;
  label: string;
  description: string;
  children: ReactNode;
  disabled?: boolean;
  recommended?: boolean;
}) {
  return (
    <article className={cx("rounded-lg border bg-white p-5 shadow-sm", disabled ? "border-ink/10 opacity-70" : "border-ink/10")}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-ink">{title}</h3>
        <ProviderBadge label={label} tone={disabled ? "disabled" : recommended ? "recommended" : "neutral"} />
      </div>
      <p className="mt-2 text-sm leading-6 text-ink/70">{description}</p>
      <div className="mt-4">{children}</div>
    </article>
  );
}
