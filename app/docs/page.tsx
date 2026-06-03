import Link from "next/link";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";

export default function DocsPage() {
  return (
    <main className="mx-auto grid max-w-4xl gap-8 px-4 py-10">
      <div>
        <h1 className="text-4xl font-black text-ink">Help and calendar setup</h1>
        <p className="mt-3 leading-7 text-ink/70">Pick matches and add them to your calendar in seconds using the fastest method available.</p>
      </div>
      <section className="grid gap-4">
        {[
          ["Calendar feeds", "Subscribe once and let your calendar app refresh updates from the generated iCal URL."],
          ["ICS downloads", "Download a one-time calendar file and import it into Google Calendar, Apple Calendar, Outlook, or another calendar app."],
          ["Google direct insert", "Optional advanced path that requires Google sign-in and calendar event creation permission."],
          ["Outlook direct insert", "Planned for Phase 2 using Microsoft OAuth and Microsoft Graph."]
        ].map(([title, text]) => (
          <article key={title} className="rounded-lg border border-ink/10 bg-white p-5">
            <h2 className="text-xl font-bold text-ink">{title}</h2>
            <p className="mt-2 leading-7 text-ink/70">{text}</p>
          </article>
        ))}
      </section>
      <Link href="/review?mode=all" className="w-fit rounded-md bg-pitch px-5 py-3 font-bold text-white">Add all matches</Link>
      <DisclaimerBanner />
    </main>
  );
}
