# World Cup Calendar

World Cup Calendar is an open-source calendar tool that lets fans add FIFA international fixtures, pre-tournament friendlies, and World Cup matches to Google Calendar, Apple Calendar, Outlook, and other calendar apps.

Users can select all matches, specific teams, cities, or stadiums, then download an .ics file, subscribe to a live calendar feed, or connect Google or Microsoft Calendar for direct insertion.

![MIT License](https://img.shields.io/badge/license-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)
![Vercel](https://img.shields.io/badge/deploy-Vercel-black)

## Screenshots

Screenshots will be added after the first hosted release.

## Features

- Add all FIFA matches
- Pick specific teams
- Pick cities and stadiums
- Generate .ics files
- Generate live calendar feed URLs
- Google Calendar direct insert
- Microsoft/Outlook Calendar direct insert
- Duplicate detection for provider inserts
- Mobile-friendly UI
- Open-source and self-hostable

## Calendar Support

| Calendar | .ics download | Live feed | Direct insert |
| --- | --- | --- | --- |
| Google Calendar | Yes | Yes | Optional Google OAuth |
| Apple Calendar | Yes | Yes | No public direct insert path |
| Outlook Calendar | Yes | Yes | Optional Microsoft OAuth |
| Other apps | Yes | Yes | Provider dependent |

## Tech Stack

Next.js, TypeScript, Tailwind CSS, NextAuth/Auth.js, Prisma, PostgreSQL, Vitest, Vercel.

## Local Setup

```bash
npm install
cp .env.example .env
npx prisma migrate deploy
npm run db:seed
npm run dev
```

The app works without provider OAuth for .ics downloads and feed URLs. Google and Microsoft OAuth are only needed for their direct insertion options.

## Environment Variables

`DATABASE_URL` points Prisma at PostgreSQL. `NEXTAUTH_URL` and `NEXTAUTH_SECRET` are required for auth. Google credentials enable Google direct insert. Microsoft credentials enable Outlook direct insert. `APP_BASE_URL` is used to generate public feed URLs. Fixture source variables configure the refresh job, and `CRON_SECRET` protects that endpoint.

## Database

Run migrations with:

```bash
npm run db:deploy
```

Seed the current fixture baseline with friendlies plus the 104-match tournament schedule:

```bash
npm run db:seed
```

## Generate .ics

POST `/api/calendar/ics` with:

```json
{ "mode": "teams", "teams": ["Canada", "Portugal"] }
```

The response is a `text/calendar` file attachment.

## Calendar Feed URLs

Use URLs like:

```text
/api/calendar/feed?mode=teams&teams=Canada,Portugal
```

Feeds return valid iCalendar content and use stable event UIDs.

## Google Direct Insert

Google direct insert uses OAuth with `https://www.googleapis.com/auth/calendar.events.owned`, inserts into the user's primary calendar, and stores provider credentials plus event IDs for authenticated insertion and duplicate detection. Public Google OAuth apps may need Google verification before broad public use.

## Microsoft Direct Insert

Microsoft direct insert uses delegated `Calendars.ReadWrite` permission and Microsoft Graph `POST /me/events`. It supports personal Microsoft accounts and work or school accounts when the app registration uses the `common` tenant.

## Deployment

Deploy on Vercel, connect a managed PostgreSQL database, configure environment variables, run `npm run db:deploy` and `npm run db:seed`, and add the production OAuth redirect URIs.

## Privacy and Security

No account is needed for .ics or feed use. Provider credentials are stored server-side and are never exposed to the browser. See the in-app privacy policy for the complete disclosure.

## Known Limitations

The checked-in fixture baseline contains pre-tournament friendlies plus 104 World Cup matches. Automatic updates run daily and depend on `FIXTURE_SOURCE_URL`, `FRIENDLIES_SOURCE_URL`, `CRON_SECRET`, and the deployed cron job. Full VTIMEZONE blocks are not yet emitted; ICS events are emitted as UTC values from match time data.

## Roadmap

Future work includes event update/removal flows, additional fixture source adapters, and richer timezone metadata.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
