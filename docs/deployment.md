# Deployment

Vercel checklist:

1. Create a Vercel project.
2. Connect the GitHub repo.
3. Connect managed PostgreSQL and set its pooled connection string as `DATABASE_URL`.
4. Set `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, and `APP_BASE_URL`.
5. Set `FIXTURE_SOURCE_URL`, `FRIENDLIES_SOURCE_URL`, and `CRON_SECRET` so the daily fixture refresh works.
6. Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` only if using direct Google insert.
7. Run `npm run db:deploy`, then `npm run db:seed`, against production.
8. Add the production Google redirect URI.
9. Put the deployed privacy and terms URLs on the Google OAuth consent screen.
10. Test deployed feed URLs and .ics downloads.
11. Test the fixture refresh endpoint with its bearer secret.
12. Test Google sign-in, direct insert, and duplicate skipping.

For local Prisma commands, use `.env`. Prisma CLI loads `.env` automatically, while Next.js can also read `.env.local` if you prefer separate local app secrets.
