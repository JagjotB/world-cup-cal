# Data Sources

The app ships with a fixture baseline in `data/matches.json` that combines pre-tournament international friendlies with the 104-match World Cup schedule.

The World Cup baseline was last cross-checked against FIFA's official fixtures API on June 11, 2026:

```text
https://api.fifa.com/api/v3/calendar/matches?idCompetition=17&idSeason=285023
```

The June 2-10 friendly results were cross-checked against The Guardian's results page:

```text
https://www.theguardian.com/football/friendlies/results
```

Configured deployments can refresh the database from `FIXTURE_SOURCE_URL` and `FRIENDLIES_SOURCE_URL` through `/api/admin/refresh-fixtures`. The included Vercel cron runs hourly and authenticates with `CRON_SECRET`.

Current source:

```text
https://worldcuply.com/schedule.html
https://www.theguardian.com/football/friendlies/fixtures
```

FIFA states the 2026 tournament schedule contains 104 matches. The Guardian page supplies the current international friendlies listing. Do not use FIFA logos or imply official affiliation. If you replace a source, prefer public, licensed, or first-party fixture sources and update this file.
