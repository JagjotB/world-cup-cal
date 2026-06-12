# Outlook Calendar Setup

Create an app registration in Microsoft Entra ID:

1. Choose the account type that supports organizational directories and personal Microsoft accounts.
2. Add a Web redirect URI:
   - Local: `http://localhost:3000/api/auth/callback/azure-ad`
   - Production: `https://YOUR_DOMAIN/api/auth/callback/azure-ad`
3. Add the delegated Microsoft Graph permission `Calendars.ReadWrite`.
4. Create a client secret.

Set:

```text
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=
MICROSOFT_TENANT_ID=common
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

Direct insert creates selected events in the signed-in user's default calendar through `POST /me/events`. The app requests `offline_access` so it can refresh expired access tokens. Outlook also continues to support .ics import and live iCal subscriptions without signing in.
