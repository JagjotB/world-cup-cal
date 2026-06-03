import { AlertCircle } from "lucide-react";
import { disclaimer } from "@/lib/calendar/formatting";

export function DisclaimerBanner() {
  return (
    <div className="flex gap-3 rounded-lg border border-clay/30 bg-clay/10 p-4 text-sm leading-6 text-ink/75">
      <AlertCircle className="mt-1 h-4 w-4 shrink-0 text-clay" />
      <p>{disclaimer}</p>
    </div>
  );
}
