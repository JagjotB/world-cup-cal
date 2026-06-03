# Contributing

Install dependencies with `npm install`, run migrations with `npx prisma migrate dev`, seed data with `npm run db:seed`, and start development with `npm run dev`.

Run tests with `npm test`.

To add fixture data, update `data/matches.json` and the related team, city, and stadium lists. To add a calendar provider, keep the universal .ics/feed flow intact and add provider-specific code under `lib/calendar` and `app/api/calendar`.

Use TypeScript, keep provider tokens server-side, and add tests for pure mapping and filtering functions.
