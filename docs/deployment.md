# Deployment

Vercel checklist:

1. Create a Vercel project.
2. Connect the GitHub repo.
3. Connect managed PostgreSQL and set its pooled connection string as `DATABASE_URL`.
4. Set `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, and `APP_BASE_URL`.
5. Set `FIXTURE_SOURCE_URL`, `FRIENDLIES_SOURCE_URL`, and `CRON_SECRET` so the daily fixture refresh works.
6. Add Google credentials if using Google direct insert.
7. Add `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`, and `MICROSOFT_TENANT_ID=common` if using Outlook direct insert.
8. Run `npm run db:deploy`, then `npm run db:seed`, against production.
9. Add the production Google and Microsoft redirect URIs.
10. Put the deployed privacy and terms URLs on the provider consent screens.
11. Test deployed feed URLs and .ics downloads.
12. Test the fixture refresh endpoint with its bearer secret.
13. Test Google and Microsoft sign-in, direct insert, and duplicate skipping.

For local Prisma commands, use `.env`. Prisma CLI loads `.env` automatically, while Next.js can also read `.env.local` if you prefer separate local app secrets.
