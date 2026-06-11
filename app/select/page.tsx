import { SelectClient } from "@/app/select/select-client";
import { getRuntimeCities, getRuntimeStadiums, getRuntimeTeams } from "@/lib/fixtures";
import type { SelectionMode } from "@/lib/types";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SelectPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  return (
    <SelectClient
      teams={await getRuntimeTeams()}
      cities={await getRuntimeCities()}
      stadiums={await getRuntimeStadiums()}
      initialMode={(typeof params.mode === "string" ? params.mode : "teams") as SelectionMode}
      initialTeams={typeof params.teams === "string" ? params.teams.split(",").filter(Boolean) : []}
      initialCities={typeof params.cities === "string" ? params.cities.split(",").filter(Boolean) : []}
      initialStadiums={typeof params.stadiums === "string" ? params.stadiums.split(",").filter(Boolean) : []}
    />
  );
}
