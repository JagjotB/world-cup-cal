export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isLocalUrl(value: string) {
  try {
    const hostname = new URL(value).hostname;
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

export function getAppBaseUrl(requestHeaders?: Pick<Headers, "get">) {
  const configuredUrl = process.env.APP_BASE_URL || process.env.NEXTAUTH_URL;
  if (configuredUrl && (process.env.NODE_ENV !== "production" || !isLocalUrl(configuredUrl))) {
    return configuredUrl;
  }

  const forwardedHost = requestHeaders?.get("x-forwarded-host");
  const host = forwardedHost || requestHeaders?.get("host");
  if (host) {
    const protocol = requestHeaders?.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
    return `${protocol}://${host}`;
  }

  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}

export function isGoogleConfigured() {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}
