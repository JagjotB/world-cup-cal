import { selectionToSearchParams } from "@/lib/selection";
import type { SelectionInput } from "@/lib/types";

export function generateFeedUrl(selection: SelectionInput, appBaseUrl: string) {
  return `${appBaseUrl.replace(/\/$/, "")}/api/calendar/feed?${selectionToSearchParams(selection)}`;
}

export function generateWebcalUrl(feedUrl: string) {
  return feedUrl.replace(/^https?:\/\//, "webcal://");
}
