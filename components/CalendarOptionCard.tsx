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
    <article className={cx("rounded-2xl border border-white/10 bg-glass p-5 shadow-card", disabled ? "opacity-60" : "")}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold">{title}</h3>
        <ProviderBadge label={label} tone={disabled ? "disabled" : recommended ? "recommended" : "neutral"} />
      </div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      <div className="mt-4">{children}</div>
    </article>
  );
}
