# Deployment

Vercel checklist:

1. Create a Vercel project.
2. Connect the GitHub repo.
3. Set `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, and `APP_BASE_URL`.
4. Set `FIXTURE_SOURCE_URL`, `FRIENDLIES_SOURCE_URL`, and `CRON_SECRET` so scheduled fixture refreshes work.
5. Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` only if using direct Google insert.
6. Configure a production database.
7. Run Prisma migrations.
8. Add the production Google redirect URI.
9. Test deployed feed URLs.
10. Test deployed .ics downloads.
11. Test the fixture refresh endpoint.
12. Test Google sign-in.
13. Test direct insert and duplicate skipping.

For local Prisma commands, use `.env`. Prisma CLI loads `.env` automatically, while Next.js can also read `.env.local` if you prefer separate local app secrets.
