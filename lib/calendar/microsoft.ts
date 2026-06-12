import type { Account } from "@prisma/client";
import { prisma } from "@/lib/db";
import { formatMatchDescription, formatMatchLocation, formatMatchTitle } from "@/lib/calendar/formatting";
import type { Match } from "@/lib/types";

type MicrosoftTokenResponse = {
  access_token?: string;
  expires_in?: number;
  refresh_token?: string;
};

function asUtcDateTime(value: string) {
  return new Date(value).toISOString().replace(/\.\d{3}Z$/, "");
}

export function mapMatchToMicrosoftCalendarEvent(match: Match) {
  return {
    subject: formatMatchTitle(match),
    body: {
      contentType: "text",
      content: formatMatchDescription(match)
    },
    start: {
      dateTime: asUtcDateTime(match.startTime),
      timeZone: "UTC"
    },
    end: {
      dateTime: asUtcDateTime(match.endTime),
      timeZone: "UTC"
    },
    location: {
      displayName: formatMatchLocation(match)
    },
    transactionId: `world-cup-cal-${match.id}`,
    showAs: "busy",
    isReminderOn: true,
    reminderMinutesBeforeStart: 30
  };
}

export async function getMicrosoftAccessToken(account: Account) {
  const expiresSoon = !account.expires_at || account.expires_at <= Math.floor(Date.now() / 1000) + 60;
  if (account.access_token && !expiresSoon) return account.access_token;

  if (!account.refresh_token) {
    throw new Error("Microsoft refresh token is missing.");
  }

  const tenantId = process.env.MICROSOFT_TENANT_ID || "common";
  const response = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.MICROSOFT_CLIENT_ID ?? "",
      client_secret: process.env.MICROSOFT_CLIENT_SECRET ?? "",
      grant_type: "refresh_token",
      refresh_token: account.refresh_token,
      scope: "openid profile email offline_access Calendars.ReadWrite"
    })
  });

  const tokens = (await response.json()) as MicrosoftTokenResponse;
  if (!response.ok || !tokens.access_token) {
    throw new Error("Microsoft access token refresh failed.");
  }

  await prisma.account.update({
    where: { id: account.id },
    data: {
      access_token: tokens.access_token,
      expires_at: Math.floor(Date.now() / 1000) + (tokens.expires_in ?? 3600),
      refresh_token: tokens.refresh_token ?? account.refresh_token
    }
  });

  return tokens.access_token;
}
