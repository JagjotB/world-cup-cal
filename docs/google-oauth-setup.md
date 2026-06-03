# Google OAuth Setup

Create a Google Cloud project, enable the Google Calendar API, and configure an OAuth consent screen.

Create OAuth web credentials and add redirect URIs:

- Local: `http://localhost:3000/api/auth/callback/google`
- Production: `https://YOUR_DOMAIN/api/auth/callback/google`

Set:

```text
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

World Cup Calendar requests `https://www.googleapis.com/auth/calendar.events` so it can create only the events the user chooses. Public apps may require Google OAuth verification.
