import Link from "next/link";
import { headers } from "next/headers";
import { ResultClient } from "@/app/result/result-client";
import { getAppBaseUrl, isGoogleConfigured, isMicrosoftConfigured } from "@/lib/utils";
import type { SelectionInput } from "@/lib/types";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ResultPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const requestHeaders = await headers();
  const method = typeof params.method === "string" ? params.method : "feed";
  const selection: SelectionInput = {
    mode: (typeof params.mode === "string" ? params.mode : "all") as SelectionInput["mode"],
    teams: typeof params.teams === "string" ? params.teams.split(",") : undefined,
    cities: typeof params.cities === "string" ? params.cities.split(",") : undefined,
    stadiums: typeof params.stadiums === "string" ? params.stadiums.split(",") : undefined
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-hero">
      <div className="absolute inset-0 stadium-beam" />
      <div className="absolute inset-0 pitch-lines opacity-15" />
      <div className="relative mx-auto grid max-w-5xl gap-8 px-5 py-16 lg:px-8 lg:py-20">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">Step 3 of 3 · Result</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          {method === "ics"
            ? "Your calendar file is ready."
            : method === "google"
              ? "Google Calendar insert"
              : method === "microsoft"
                ? "Microsoft Calendar insert"
                : "Your calendar feed is ready."}
        </h1>
      </div>
      <ResultClient
        method={method}
        selection={selection}
        appBaseUrl={getAppBaseUrl(requestHeaders)}
        googleConfigured={isGoogleConfigured()}
        microsoftConfigured={isMicrosoftConfigured()}
      />
      <Link href="/select?mode=teams" className="w-fit rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold hover:border-gold/50 hover:text-gold">
        Add more matches
      </Link>
      </div>
    </main>
  );
}
