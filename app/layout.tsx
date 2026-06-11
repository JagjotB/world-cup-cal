import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import "./globals.css";

export const metadata: Metadata = {
  title: "World Cup Calendar - Pick matches. Add them to your calendar.",
  description: "Choose the matches you care about and add them to Google Calendar, Apple Calendar, Outlook, or any calendar app."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
