import { SelectClient } from "@/app/select/select-client";
import { getRuntimeCities, getRuntimeStadiums, getRuntimeTeams } from "@/lib/fixtures";
import type { SelectionMode } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function SelectPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <SelectClient
      teams={await getRuntimeTeams()}
      cities={await getRuntimeCities()}
      stadiums={await getRuntimeStadiums()}
      initialMode={(typeof searchParams.mode === "string" ? searchParams.mode : "teams") as SelectionMode}
      initialTeams={typeof searchParams.teams === "string" ? searchParams.teams.split(",").filter(Boolean) : []}
      initialCities={typeof searchParams.cities === "string" ? searchParams.cities.split(",").filter(Boolean) : []}
      initialStadiums={typeof searchParams.stadiums === "string" ? searchParams.stadiums.split(",").filter(Boolean) : []}
    />
  );
}
