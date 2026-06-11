export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-14 lg:px-8">
      <h1 className="text-4xl font-extrabold">Privacy Policy</h1>
      <div className="mt-6 grid gap-5 leading-7 text-muted-foreground">
        <p>World Cup Calendar works without an account when you use .ics downloads or calendar feed URLs.</p>
        <p>When you choose Google direct insert, we store your basic Google account profile, an authenticated session, encrypted-in-transit Google access credentials, and the Google event IDs created by the app. These records let us insert selected matches, refresh authorization when permitted, and avoid duplicate events.</p>
        <p>Our Google permission is limited to calendars you own. We use it only when you request an insertion. We do not read unrelated personal calendar events or expose Google credentials to the browser.</p>
        <p>We do not sell personal data. You can revoke access at any time from your Google Account security settings. Revoking access stops future insertions but does not remove events already created.</p>
        <p>Database records are retained while needed to provide direct insertion and duplicate detection. To request deletion of account and synchronization records, open an issue in the project&apos;s GitHub repository.</p>
      </div>
    </main>
  );
}
