import { PrismaClient } from "@prisma/client";
import matches from "../data/matches.json";

const prisma = new PrismaClient();

async function main() {
  for (const match of matches) {
    await prisma.match.upsert({
      where: { id: match.id },
      update: {
        matchNumber: match.matchNumber,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        stage: match.stage,
        startTime: new Date(match.startTime),
        endTime: new Date(match.endTime),
        timezone: match.timezone,
        stadium: match.stadium,
        city: match.city,
        country: match.country,
        competition: match.competition,
        source: match.source,
        sourceUrl: match.sourceUrl,
        status: match.status
      },
      create: {
        id: match.id,
        matchNumber: match.matchNumber,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        stage: match.stage,
        startTime: new Date(match.startTime),
        endTime: new Date(match.endTime),
        timezone: match.timezone,
        stadium: match.stadium,
        city: match.city,
        country: match.country,
        competition: match.competition,
        source: match.source,
        sourceUrl: match.sourceUrl,
        status: match.status
      }
    });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
