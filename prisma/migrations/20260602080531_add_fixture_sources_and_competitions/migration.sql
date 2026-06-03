-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchNumber" INTEGER NOT NULL,
    "homeTeam" TEXT NOT NULL,
    "awayTeam" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "timezone" TEXT NOT NULL,
    "stadium" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "competition" TEXT NOT NULL DEFAULT 'FIFA World Cup 2026',
    "source" TEXT NOT NULL DEFAULT 'manual',
    "sourceUrl" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Match" ("awayTeam", "city", "country", "createdAt", "endTime", "homeTeam", "id", "matchNumber", "stadium", "stage", "startTime", "status", "timezone", "updatedAt") SELECT "awayTeam", "city", "country", "createdAt", "endTime", "homeTeam", "id", "matchNumber", "stadium", "stage", "startTime", "status", "timezone", "updatedAt" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
