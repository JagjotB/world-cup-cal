import { AlertCircle } from "lucide-react";
import { disclaimer } from "@/lib/calendar/formatting";

export function DisclaimerBanner() {
  return (
    <div className="flex gap-3 rounded-xl border border-gold/20 bg-gold/[0.05] p-4 text-sm leading-6 text-muted-foreground">
      <AlertCircle className="mt-1 h-4 w-4 shrink-0 text-gold" />
      <p>{disclaimer}</p>
    </div>
  );
}
