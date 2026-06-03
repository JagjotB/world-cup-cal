import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "World Cup Calendar",
  description: "Pick matches and add them to your calendar."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-ink/10 bg-white/80 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-lg font-black text-ink">World Cup Calendar</Link>
            <div className="flex gap-4 text-sm font-semibold text-ink/70">
              <Link href="/docs">Docs</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
