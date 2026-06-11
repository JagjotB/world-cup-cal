import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  CalendarRange,
  Check,
  Download,
  KeySquare,
  ListChecks,
  MapPin,
  Plus,
  Radio,
  ShieldCheck,
  Trophy
} from "lucide-react";
import { GlowCard } from "@/components/GlowCard";

const providers = [
  ["G", "Google Calendar", ".ics · Feed · Direct insert", "text-host-blue border-host-blue/40 bg-host-blue/15"],
  ["A", "Apple Calendar", ".ics · Subscribe to feed", "text-foreground border-white/20 bg-white/10"],
  ["O", "Outlook", ".ics · Feed · Direct soon", "text-cyan border-cyan/30 bg-cyan/10"],
  ["+", "Other calendars", "Any app that reads .ics", "text-muted-foreground border-white/15 bg-white/[0.04]"]
];

const steps = [
  [ListChecks, "01", "Choose matches", "Add every match or filter by team, city, or stadium. Select one or the full schedule."],
  [CalendarRange, "02", "Pick your calendar", "Use a no-login calendar feed, download an .ics file, or connect Google Calendar."],
  [Trophy, "03", "Stay matchday ready", "Your selected fixtures show up wherever you keep your calendar."]
] as const;

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-hero">
        <Image src="/site/legend-1.jpg" alt="" fill priority className="object-cover object-center opacity-25 [mask-image:linear-gradient(to_bottom,black_20%,transparent_92%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/45" />
        <div className="absolute inset-0 stadium-beam" />
        <div className="absolute inset-0 pitch-lines opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-28 pt-20 lg:grid-cols-12 lg:px-8 lg:pb-36 lg:pt-28">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-gold shadow-glow" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/80">Summer 2026 · 48 nations · 16 host cities</span>
            </div>
            <h1 className="mt-6 text-balance font-display text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl">
              Never miss<br />
              <span className="bg-gradient-to-r from-gold via-foreground to-gold bg-clip-text text-transparent">a match.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Pick all matches, your favourite teams, host cities, or stadiums, then add them to Google Calendar, Apple Calendar, Outlook, or any calendar app.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/review?mode=all" className="inline-flex h-14 items-center gap-2 rounded-full bg-cta px-8 font-semibold text-gold-foreground shadow-glow transition hover:-translate-y-0.5">
                <Plus className="h-5 w-5" /> Add all matches
              </Link>
              <Link href="/select?mode=teams" className="inline-flex h-14 items-center rounded-full border border-white/10 bg-white/[0.06] px-8 font-semibold transition hover:bg-white/[0.1]">
                Pick teams
              </Link>
            </div>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">No account needed for .ics files or calendar feeds</p>
          </div>
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md rounded-3xl border border-white/10 bg-glass p-5 shadow-glow">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3 py-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80">Live build</span>
                <span className="font-mono text-[10px] text-muted-foreground">M · 04</span>
              </div>
              <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5">
                <div className="absolute left-0 top-0 h-full w-1 bg-host-red" />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Group stage</span>
                  <Trophy className="h-5 w-5 animate-float text-gold" />
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <span className="font-display text-2xl font-bold">Canada</span>
                  <span className="font-mono text-xs text-muted-foreground">vs</span>
                  <span className="font-display text-2xl font-bold text-muted-foreground">TBD</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-xs">
                  <span className="inline-flex items-center gap-1 font-mono"><Calendar className="h-3 w-3" /> Jun 12 · 18:00</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground"><MapPin className="h-3 w-3" /> Toronto · BMO Field</span>
                </div>
                <div className="mt-5 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-full bg-cta text-xs font-semibold text-gold-foreground">
                  <Plus className="h-3.5 w-3.5" /> Add to calendar
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="calendars" className="border-y border-white/[0.06] py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Eyebrow>Compatibility</Eyebrow>
          <h2 className="mt-3 max-w-xl text-3xl font-bold sm:text-4xl">Works with every major calendar.</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {providers.map(([initial, name, sub, tone]) => (
              <GlowCard key={name} className="p-6">
                <div className={`grid h-12 w-12 place-items-center rounded-xl border font-display text-xl font-bold ${tone}`}>{initial}</div>
                <h3 className="mt-5 text-base font-semibold">{name}</h3>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{sub}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="relative overflow-hidden py-24">
        <Image src="/site/legend-3.jpg" alt="" fill className="object-cover object-center opacity-10 [mask-image:radial-gradient(ellipse_at_right,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">Three steps to a matchday-ready calendar.</h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {steps.map(([Icon, number, title, body], index) => (
              <GlowCard key={number} accent={index === 0 ? "red" : index === 1 ? "blue" : "gold"} className="p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">STEP · {number}</span>
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="mt-6 text-2xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-surface/40 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Eyebrow>Flexible by design</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Choose how your fixtures arrive.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Method icon={Radio} badge="Recommended" title="Live calendar feed">Subscribe once and let your calendar app refresh fixture updates.</Method>
            <Method icon={Download} badge="No login" title="Download .ics">Import selected matches into any calendar app.</Method>
            <Method icon={CalendarRange} badge="Optional" title="Google direct insert">Connect Google Calendar and add your selected matches directly.</Method>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <Image src="/site/legend-4.jpg" alt="" fill className="object-cover object-center opacity-15 [mask-image:radial-gradient(ellipse_at_left,black,transparent_72%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-background/80 to-background" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Eyebrow>Trust</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Built for trust. Made by fans.</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Trust icon={ShieldCheck} title="No login required">Use .ics files or calendar feeds without creating an account.</Trust>
            <Trust icon={Check} title="You stay in control">Only the matches you select are included.</Trust>
            <Trust icon={KeySquare} title="Google is optional">Direct insertion happens only after you approve access.</Trust>
            <Trust icon={Trophy} title="Unofficial and transparent">Fixture details should be verified with official sources.</Trust>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/[0.06] bg-hero">
        <Image src="/site/legend-2.jpg" alt="" fill className="object-cover object-center opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 goal-net opacity-20" />
        <div className="relative mx-auto max-w-4xl px-5 py-28 text-center">
          <Eyebrow>Kickoff is coming</Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-none sm:text-6xl">Build your match calendar <span className="text-gold">before kickoff.</span></h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">Subscribe to a feed, download an .ics file, or sync with Google.</p>
          <Link href="/select" className="mt-10 inline-flex h-14 items-center rounded-full bg-cta px-8 font-semibold text-gold-foreground shadow-glow">Start selecting matches</Link>
        </div>
      </section>
    </main>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">{children}</p>;
}

function Method({ icon: Icon, badge, title, children }: { icon: typeof Radio; badge: string; title: string; children: React.ReactNode }) {
  return (
    <GlowCard accent="gold" className="p-6">
      <div className="flex items-center justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-gold"><Icon className="h-5 w-5" /></span>
        <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-gold">{badge}</span>
      </div>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </GlowCard>
  );
}

function Trust({ icon: Icon, title, children }: { icon: typeof ShieldCheck; title: string; children: React.ReactNode }) {
  return (
    <GlowCard className="p-6">
      <Icon className="h-5 w-5 text-gold" />
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </GlowCard>
  );
}
