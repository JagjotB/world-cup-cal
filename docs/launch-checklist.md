# Launch Checklist

- Verify fixture data and source notes.
- Confirm `data/matches.json` includes friendlies plus 104 World Cup matches.
- Confirm managed PostgreSQL is connected and `npm run db:deploy` and `npm run db:seed` have completed.
- Confirm `FIXTURE_SOURCE_URL`, `FRIENDLIES_SOURCE_URL`, and `CRON_SECRET` are configured in production.
- Trigger `/api/admin/refresh-fixtures` and confirm it returns the combined fixture count.
- Confirm disclaimer appears in UI and event descriptions.
- Test all selection modes.
- Test `.ics` download in Google, Apple, and Outlook.
- Test feed subscription URLs on the deployed domain.
- Confirm Google OAuth redirect URIs.
- Confirm Microsoft OAuth redirect URIs and delegated `Calendars.ReadWrite` permission.
- Confirm the Google consent screen links to the deployed privacy policy and terms.
- Test Microsoft direct insert with both a personal account and a work or school account.
- Confirm `.env` files are not committed.
- Run `npm audit`.
- Run `npm run lint`.
- Run `npm test`.
- Run `npm run build`.
