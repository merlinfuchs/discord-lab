/*
  Warnings:

  - You are about to drop the `DiscordSnowflakes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DiscordSnowflakes";

-- CreateTable
CREATE TABLE "DiscordSnowflake" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "exists" BOOLEAN NOT NULL,

    CONSTRAINT "DiscordSnowflake_pkey" PRIMARY KEY ("id","type")
);
