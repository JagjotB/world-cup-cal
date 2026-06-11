"use client";

import { useEffect, useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { InstructionSteps } from "@/components/InstructionSteps";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ResultSummary } from "@/components/ResultSummary";
import { generateFeedUrl } from "@/lib/calendar/feed";
import type { GoogleInsertItem, SelectionInput } from "@/lib/types";

export function ResultClient({
  method,
  selection,
  appBaseUrl,
  googleConfigured
}: {
  method: string;
  selection: SelectionInput;
  appBaseUrl: string;
  googleConfigured: boolean;
}) {
  const [googleResult, setGoogleResult] = useState<{ added: GoogleInsertItem[]; skipped: GoogleInsertItem[]; failed: GoogleInsertItem[] } | null>(null);
  const [error, setError] = useState("");
  const feedUrl = useMemo(() => generateFeedUrl(selection, appBaseUrl), [selection, appBaseUrl]);

  useEffect(() => {
    if (method !== "google" || !googleConfigured || googleResult || error) return;
    fetch("/api/calendar/google/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selection)
    })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) throw new Error(body.error ?? "Google insert failed.");
        setGoogleResult(body);
      })
      .catch((err: Error) => setError(err.message));
  }, [method, googleConfigured, googleResult, error, selection]);

  if (method === "google") {
    if (!googleConfigured) {
      return <p className="rounded-2xl border border-white/10 bg-glass p-5 text-muted-foreground">Google direct insert is not configured in this deployment. You can still use .ics download or calendar feed.</p>;
    }
    if (error) return <p className="rounded-2xl border border-host-red/30 bg-host-red/10 p-5 font-semibold">{error}</p>;
    if (!googleResult) {
      return <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-glass p-5"><LoadingSpinner /> Adding matches to Google Calendar...</div>;
    }
    return <ResultSummary added={googleResult.added} skipped={googleResult.skipped} failed={googleResult.failed} />;
  }

  if (method === "ics") {
    return (
      <section className="grid gap-5 rounded-2xl border border-gold/30 bg-glass p-6 shadow-glow">
        <p className="leading-7 text-muted-foreground">Your download should have started. An .ics file is a one-time import. If match details change later, imported events may not update automatically.</p>
        <InstructionSteps
          title="Basic import"
          steps={["Open your calendar app.", "Choose import or open the downloaded .ics file.", "Pick the calendar where match events should be added.", "Verify the imported event times."]}
        />
      </section>
    );
  }

  return (
    <section className="grid gap-5 rounded-2xl border border-cyan/30 bg-glass p-6 shadow-card">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">Feed URL</p>
        <p className="mt-2 break-all rounded-xl border border-white/10 bg-black/30 p-3 font-mono text-sm text-cyan">{feedUrl}</p>
        <div className="mt-3"><CopyButton value={feedUrl} label="Copy feed URL" /></div>
      </div>
      <p className="leading-7 text-muted-foreground">A calendar feed appears as a separate subscribed calendar. Updates depend on how often your calendar app refreshes subscriptions.</p>
      <div className="grid gap-4 md:grid-cols-3">
        <InstructionSteps title="Google" steps={["Open Google Calendar on desktop.", "Beside Other calendars, click plus.", "Choose From URL.", "Paste the generated calendar feed URL.", "Click Add calendar."]} />
        <InstructionSteps title="Apple" steps={["In Calendar on Mac, choose File.", "Choose New Calendar Subscription.", "Paste the feed URL."]} />
        <InstructionSteps title="Outlook" steps={["Open Outlook calendar settings.", "Choose subscribe from web or import.", "Paste the online iCal feed URL."]} />
      </div>
    </section>
  );
}
