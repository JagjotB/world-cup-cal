import Link from "next/link";
import { ResultClient } from "@/app/result/result-client";
import { getAppBaseUrl, isGoogleConfigured } from "@/lib/utils";
import type { SelectionInput } from "@/lib/types";

export default function ResultPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const method = typeof searchParams.method === "string" ? searchParams.method : "feed";
  const selection: SelectionInput = {
    mode: (typeof searchParams.mode === "string" ? searchParams.mode : "all") as SelectionInput["mode"],
    teams: typeof searchParams.teams === "string" ? searchParams.teams.split(",") : undefined,
    cities: typeof searchParams.cities === "string" ? searchParams.cities.split(",") : undefined,
    stadiums: typeof searchParams.stadiums === "string" ? searchParams.stadiums.split(",") : undefined
  };

  return (
    <main className="mx-auto grid max-w-5xl gap-8 px-4 py-10">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-pitch">Result</p>
        <h1 className="mt-2 text-4xl font-black text-ink">
          {method === "ics" ? "Your calendar file is ready." : method === "google" ? "Google Calendar insert" : "Your calendar feed is ready."}
        </h1>
      </div>
      <ResultClient method={method} selection={selection} appBaseUrl={getAppBaseUrl()} googleConfigured={isGoogleConfigured()} />
      <Link href="/select?mode=teams" className="w-fit rounded-md border border-ink/15 bg-white px-4 py-2 font-bold text-ink">
        Add more matches
      </Link>
    </main>
  );
}
