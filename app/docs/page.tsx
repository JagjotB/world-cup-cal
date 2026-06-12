import Link from "next/link";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";

export default function DocsPage() {
  return (
    <main className="mx-auto grid min-h-screen max-w-4xl gap-8 px-5 py-14 lg:px-8">
      <div>
        <h1 className="text-4xl font-extrabold">Help and calendar setup</h1>
        <p className="mt-3 leading-7 text-muted-foreground">Pick matches and add them to your calendar in seconds using the fastest method available.</p>
      </div>
      <section className="grid gap-4">
        {[
          ["Calendar feeds", "Subscribe once and let your calendar app refresh updates from the generated iCal URL."],
          ["ICS downloads", "Download a one-time calendar file and import it into Google Calendar, Apple Calendar, Outlook, or another calendar app."],
          ["Google direct insert", "Optional advanced path that requires Google sign-in and calendar event creation permission."],
          ["Outlook direct insert", "Optional path that signs in with Microsoft and creates selected events through Microsoft Graph."]
        ].map(([title, text]) => (
          <article key={title} className="rounded-2xl border border-white/10 bg-glass p-5 shadow-card">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="mt-2 leading-7 text-muted-foreground">{text}</p>
          </article>
        ))}
      </section>
      <Link href="/review?mode=all" className="w-fit rounded-full bg-cta px-5 py-3 font-semibold text-gold-foreground shadow-glow">Add all matches</Link>
      <DisclaimerBanner />
    </main>
  );
}
