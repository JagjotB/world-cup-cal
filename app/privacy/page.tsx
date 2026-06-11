export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-14 lg:px-8">
      <h1 className="text-4xl font-extrabold">Privacy Policy</h1>
      <div className="mt-6 grid gap-5 leading-7 text-muted-foreground">
        <p>World Cup Calendar works without an account when you use .ics downloads or calendar feed URLs.</p>
        <p>World Cup Calendar stores basic account information only when you choose Google direct insert. We store event IDs for matches added through the app so we can avoid duplicates. We do not sell personal data.</p>
        <p>We do not read your personal calendar events and do not expose Google access tokens to the browser.</p>
      </div>
    </main>
  );
}
