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
      return <p className="rounded-lg border border-ink/10 bg-white p-5 text-ink/70">Google direct insert is not configured in this deployment. You can still use .ics download or calendar feed.</p>;
    }
    if (error) return <p className="rounded-lg border border-clay/30 bg-clay/10 p-5 font-semibold text-ink">{error}</p>;
    if (!googleResult) {
      return <div className="flex items-center gap-3 rounded-lg border border-ink/10 bg-white p-5"><LoadingSpinner /> Adding matches to Google Calendar...</div>;
    }
    return <ResultSummary added={googleResult.added} skipped={googleResult.skipped} failed={googleResult.failed} />;
  }

  if (method === "ics") {
    return (
      <section className="grid gap-5 rounded-lg border border-ink/10 bg-white p-5">
        <p className="leading-7 text-ink/70">Your download should have started. An .ics file is a one-time import. If match details change later, imported events may not update automatically.</p>
        <InstructionSteps
          title="Basic import"
          steps={["Open your calendar app.", "Choose import or open the downloaded .ics file.", "Pick the calendar where match events should be added.", "Verify the imported event times."]}
        />
      </section>
    );
  }

  return (
    <section className="grid gap-5 rounded-lg border border-ink/10 bg-white p-5">
      <div>
        <p className="text-sm font-bold text-ink">Feed URL</p>
        <p className="mt-2 break-all rounded-md bg-skysoft/50 p-3 text-sm text-ink/75">{feedUrl}</p>
        <div className="mt-3"><CopyButton value={feedUrl} label="Copy feed URL" /></div>
      </div>
      <p className="leading-7 text-ink/70">A calendar feed appears as a separate subscribed calendar. Updates depend on how often your calendar app refreshes subscriptions.</p>
      <div className="grid gap-4 md:grid-cols-3">
        <InstructionSteps title="Google" steps={["Open Google Calendar on desktop.", "Beside Other calendars, click plus.", "Choose From URL.", "Paste the generated calendar feed URL.", "Click Add calendar."]} />
        <InstructionSteps title="Apple" steps={["In Calendar on Mac, choose File.", "Choose New Calendar Subscription.", "Paste the feed URL."]} />
        <InstructionSteps title="Outlook" steps={["Open Outlook calendar settings.", "Choose subscribe from web or import.", "Paste the online iCal feed URL."]} />
      </div>
    </section>
  );
}
