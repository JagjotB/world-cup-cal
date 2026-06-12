export type SelectionMode = "all" | "teams" | "cities" | "stadiums";

export type Match = {
  id: string;
  matchNumber: number;
  homeTeam: string;
  awayTeam: string;
  stage: string;
  startTime: string;
  endTime: string;
  timezone: string;
  stadium: string;
  city: string;
  country: string;
  competition: string;
  source: string;
  sourceUrl: string;
  status: "scheduled" | "placeholder";
};

export type SelectionInput = {
  mode: SelectionMode;
  teams?: string[];
  cities?: string[];
  stadiums?: string[];
};

export type CalendarInsertItem = {
  matchId: string;
  title: string;
  providerEventId?: string;
  reason?: string;
};
