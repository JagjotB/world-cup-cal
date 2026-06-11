import Link from "next/link";
import { CalendarDays, Github } from "lucide-react";

export function Brand() {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl border border-gold/30 bg-gradient-to-br from-gold/20 to-host-red/10 text-gold shadow-glow">
        <CalendarDays className="h-5 w-5" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold tracking-tight">
          World Cup <span className="text-gold">Calendar</span>
        </span>
        <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
          Unofficial · Fan-made
        </span>
      </span>
    </Link>
  );
}

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Brand />
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/#how" className="text-sm text-muted-foreground transition hover:text-foreground">How it works</Link>
          <Link href="/#calendars" className="text-sm text-muted-foreground transition hover:text-foreground">Calendars</Link>
          <Link href="/docs" className="text-sm text-muted-foreground transition hover:text-foreground">Docs</Link>
          <a href="https://github.com/jagjotbisram/worldcup" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground">
            <Github className="h-4 w-4" /> GitHub
          </a>
        </nav>
        <Link href="/select" className="rounded-full bg-cta px-4 py-2 text-sm font-semibold text-gold-foreground shadow-glow transition hover:-translate-y-0.5">
          Add matches
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-background">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Brand />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Pick matches. Add them to your calendar. Independent, transparent, and built for fans of the global game.
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Product</p>
            <div className="mt-4 grid gap-3 text-sm">
              <Link href="/select" className="text-foreground/80 hover:text-gold">Select matches</Link>
              <Link href="/docs" className="text-foreground/80 hover:text-gold">Docs</Link>
            </div>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Legal</p>
            <div className="mt-4 grid gap-3 text-sm">
              <Link href="/privacy" className="text-foreground/80 hover:text-gold">Privacy</Link>
              <Link href="/terms" className="text-foreground/80 hover:text-gold">Terms</Link>
            </div>
          </div>
        </div>
        <p className="mt-12 border-t border-white/[0.06] pt-6 text-xs leading-relaxed text-muted-foreground">
          World Cup Calendar is an unofficial fan-made tool and is not affiliated with FIFA, Google, Microsoft, Apple, or any tournament organizer. Verify match details with official sources.
        </p>
      </div>
    </footer>
  );
}
