# Data Sources

The app ships with a fixture baseline in `data/matches.json` that combines pre-tournament international friendlies with the 104-match World Cup schedule.

Configured deployments can refresh the database from `FIXTURE_SOURCE_URL` and `FRIENDLIES_SOURCE_URL` through `/api/admin/refresh-fixtures`. The included Vercel cron runs hourly and authenticates with `CRON_SECRET`.

Current source:

```text
https://worldcuply.com/schedule.html
https://www.theguardian.com/football/friendlies/fixtures
```

FIFA states the 2026 tournament schedule contains 104 matches. The Guardian page supplies the current international friendlies listing. Do not use FIFA logos or imply official affiliation. If you replace a source, prefer public, licensed, or first-party fixture sources and update this file.
