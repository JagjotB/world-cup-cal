"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CalendarOptionCard } from "@/components/CalendarOptionCard";
import { CopyButton } from "@/components/CopyButton";
import { InstructionSteps } from "@/components/InstructionSteps";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { generateFeedUrl, generateWebcalUrl } from "@/lib/calendar/feed";
import { selectionToSearchParams } from "@/lib/selection";
import type { SelectionInput } from "@/lib/types";

type Provider = "google" | "apple" | "outlook" | "other";

export function ReviewClient({
  selection,
  appBaseUrl,
  googleConfigured
}: {
  selection: SelectionInput;
  appBaseUrl: string;
  googleConfigured: boolean;
}) {
  const [provider, setProvider] = useState<Provider>("google");
  const [loading, setLoading] = useState(false);
  const query = useMemo(() => selectionToSearchParams(selection), [selection]);
  const feedUrl = useMemo(() => generateFeedUrl(selection, appBaseUrl), [selection, appBaseUrl]);
  const webcalUrl = useMemo(() => generateWebcalUrl(feedUrl), [feedUrl]);

  async function downloadIcs() {
    setLoading(true);
    try {
      const response = await fetch("/api/calendar/ics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selection)
      });
      if (!response.ok) throw new Error("Could not generate file.");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "world-cup-calendar-selected-matches.ics";
      link.click();
      window.URL.revokeObjectURL(url);
      window.location.href = `/result?method=ics&${query}`;
    } finally {
      setLoading(false);
    }
  }

  async function directGoogleInsert() {
    if (!googleConfigured) return;
    await signIn("google", { callbackUrl: `/result?method=google&${query}` });
  }

  return (
    <section className="grid gap-6">
      <div>
        <h2 className="text-2xl font-bold">Choose your calendar</h2>
        <div className="mt-4 flex w-fit flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/30 p-1">
          {[
            ["google", "Google Calendar"],
            ["apple", "Apple Calendar"],
            ["outlook", "Outlook Calendar"],
            ["other", "Other Calendar"]
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setProvider(value as Provider)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${provider === value ? "bg-gold text-gold-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {(provider === "google" || provider === "apple" || provider === "outlook" || provider === "other") && (
          <CalendarOptionCard
            title={provider === "apple" ? "Subscribe in Apple Calendar" : "Live calendar feed"}
            label="Recommended"
            recommended
            description="Subscribe once. Your calendar app can refresh updates from the feed."
          >
            <div className="grid gap-3">
              <CopyButton value={provider === "apple" ? webcalUrl : feedUrl} label="Copy feed URL" />
              <Link href={`/result?method=feed&${query}`} className="text-sm font-bold text-gold hover:text-foreground">
                View feed instructions
              </Link>
              <p className="break-all text-xs text-muted-foreground">{provider === "apple" ? webcalUrl : feedUrl}</p>
            </div>
          </CalendarOptionCard>
        )}

        <CalendarOptionCard
          title="Download .ics"
          label="No login"
          description="Download a calendar file and import it into any calendar app."
        >
          <button
            type="button"
            onClick={downloadIcs}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-cta px-4 py-2 text-sm font-semibold text-gold-foreground shadow-glow disabled:opacity-40"
          >
            {loading && <LoadingSpinner />}
            Download .ics
          </button>
        </CalendarOptionCard>

        {provider === "google" && (
          <CalendarOptionCard
            title="Google direct insert"
            label="Optional"
            description="Direct Google insert adds selected matches into your Google Calendar after you approve access."
            disabled={!googleConfigured}
          >
            {googleConfigured ? (
              <button type="button" onClick={directGoogleInsert} className="rounded-full bg-cta px-4 py-2 text-sm font-semibold text-gold-foreground shadow-glow">
                Connect Google Calendar
              </button>
            ) : (
              <p className="text-sm font-semibold text-muted-foreground">Google direct insert is not configured in this deployment. You can still use .ics download or calendar feed.</p>
            )}
            <p className="mt-3 text-xs leading-5 text-muted-foreground">Direct Google insert requires permission so World Cup Calendar can create only the match events you choose.</p>
          </CalendarOptionCard>
        )}

        {provider === "outlook" && (
          <CalendarOptionCard
            title="Outlook direct insert"
            label="Phase 2"
            disabled
            description="Direct Outlook insert is coming soon and will use Microsoft OAuth and Microsoft Graph."
          >
            <p className="text-sm font-semibold text-muted-foreground">Use the feed URL or .ics file for now.</p>
          </CalendarOptionCard>
        )}
      </div>

      <div className="grid gap-6 rounded-2xl border border-white/10 bg-black/20 p-6 md:grid-cols-3">
        <InstructionSteps
          title="Google feed"
          steps={["Open Google Calendar on desktop.", "Beside Other calendars, click plus.", "Choose From URL.", "Paste the generated calendar feed URL.", "Click Add calendar."]}
        />
        <InstructionSteps
          title="Apple Calendar"
          steps={["Download .ics and open/import it, or subscribe to the feed URL.", "On Mac, use File then New Calendar Subscription.", "On iPhone/iCloud, add a subscription calendar using the calendar URL."]}
        />
        <InstructionSteps
          title="Outlook"
          steps={["Import the .ics file.", "Or subscribe to the online iCal feed URL.", "Refresh timing depends on Outlook subscription behavior."]}
        />
      </div>
    </section>
  );
}
