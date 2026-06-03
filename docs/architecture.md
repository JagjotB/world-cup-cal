# Architecture

World Cup Calendar is a Next.js app with a universal no-login calendar layer and optional provider-specific direct insertion.

Phase 1:

- Fixture baseline with pre-tournament friendlies plus the 104-match tournament schedule
- Runtime fixture reads from Prisma with JSON fallback
- Scheduled fixture refresh from a configured source URL
- Selection filters for all, teams, cities, and stadiums
- ICS file generation
- Live iCalendar feed generation
- Optional Google Calendar direct insert
- Prisma duplicate tracking for Google inserts

Phase 2:

- Microsoft OAuth
- Microsoft Graph calendar event creation
- Additional fixture source adapters and integrity checks
- Calendar update/remove tooling

The app does not promise silent insertion into every calendar provider. It offers the fastest available method for each provider.
