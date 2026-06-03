# Launch Checklist

- Verify fixture data and source notes.
- Confirm `data/matches.json` includes friendlies plus 104 World Cup matches.
- Confirm `FIXTURE_SOURCE_URL`, `FRIENDLIES_SOURCE_URL`, and `CRON_SECRET` are configured in production.
- Trigger `/api/admin/refresh-fixtures` and confirm it returns the combined fixture count.
- Confirm disclaimer appears in UI and event descriptions.
- Test all selection modes.
- Test `.ics` download in Google, Apple, and Outlook.
- Test feed subscription URLs on the deployed domain.
- Confirm Google OAuth redirect URIs.
- Confirm `.env` files are not committed.
- Run `npm test`.
- Run `npm run build`.
