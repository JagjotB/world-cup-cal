import Link from "next/link";
import { CalendarPlus, CheckCircle, Cloud, Download, ShieldCheck, type LucideIcon } from "lucide-react";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";

export default function HomePage() {
  const features: Array<[LucideIcon, string]> = [
    [ShieldCheck, "No account needed"],
    [CheckCircle, "Works with Google, Apple, Outlook"],
    [Download, "Download .ics or subscribe to a live feed"],
    [Cloud, "Optional Google direct insert"]
  ];

  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-20">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-pitch">Open-source football calendar tool</p>
          <h1 className="mt-4 text-5xl font-black leading-tight text-ink md:text-7xl">World Cup Calendar</h1>
          <p className="mt-4 text-2xl font-bold text-ink">Pick matches. Add them to your calendar.</p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
            Create a calendar for international friendlies, World Cup matches, your favourite teams, host cities, or stadiums. Works with Google Calendar, Apple Calendar,
            Outlook, and more.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/review?mode=all" className="inline-flex items-center gap-2 rounded-md bg-pitch px-5 py-3 font-bold text-white shadow-soft hover:bg-ink">
              <CalendarPlus className="h-5 w-5" />
              Add all FIFA matches
            </Link>
            <Link href="/select?mode=teams" className="rounded-md border border-ink/15 bg-white px-5 py-3 font-bold text-ink hover:border-pitch">
              Pick teams
            </Link>
            <Link href="/select?mode=cities" className="rounded-md border border-ink/15 bg-white px-5 py-3 font-bold text-ink hover:border-pitch">
              Pick cities/stadiums
            </Link>
          </div>
          <p className="mt-4 text-sm font-semibold text-ink/60">No account needed for .ics files or calendar feeds.</p>
        </div>
        <div className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
          <div className="grid gap-4">
            {features.map(([Icon, text]) => (
              <div key={text} className="flex items-center gap-3 rounded-md bg-skysoft/45 p-4">
                <Icon className="h-5 w-5 text-pitch" />
                <p className="font-semibold text-ink">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <DisclaimerBanner />
      </section>
    </main>
  );
}
