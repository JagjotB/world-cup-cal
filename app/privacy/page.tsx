export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-14 lg:px-8">
      <h1 className="text-4xl font-extrabold">Privacy Policy</h1>
      <div className="mt-6 grid gap-5 leading-7 text-muted-foreground">
        <p>World Cup Calendar works without an account when you use .ics downloads or calendar feed URLs.</p>
        <p>When you choose Google or Microsoft direct insert, we store your basic provider account profile, an authenticated session, server-side OAuth credentials, and the provider event IDs created by the app. These records let us insert selected matches, refresh authorization when permitted, and avoid duplicate events.</p>
        <p>Google access is limited to calendars you own. Microsoft direct insert requests delegated Calendars.ReadWrite access. The app uses these permissions only to create the match events you request and does not call provider APIs to read unrelated personal events. OAuth credentials are never exposed to the browser.</p>
        <p>We do not sell personal data. You can revoke access from your Google Account or Microsoft Account security settings. Revoking access stops future insertions but does not remove events already created.</p>
        <p>Database records are retained while needed to provide direct insertion and duplicate detection. To request deletion of account and synchronization records, open an issue in the project&apos;s GitHub repository.</p>
      </div>
    </main>
  );
}
