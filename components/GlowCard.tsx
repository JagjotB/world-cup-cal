import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/utils";

const accents = {
  gold: "before:bg-gold/70",
  cyan: "before:bg-cyan/70",
  red: "before:bg-host-red/70",
  green: "before:bg-host-green/70",
  blue: "before:bg-host-blue/70",
  none: "before:hidden"
};

export function GlowCard({
  className,
  children,
  accent = "none",
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  accent?: keyof typeof accents;
}) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-glass shadow-card before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:content-['']",
        accents[accent],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
