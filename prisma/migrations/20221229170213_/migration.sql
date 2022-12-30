/*
  Warnings:

  - The primary key for the `DiscordSnowflake` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `exists` on the `DiscordSnowflake` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `DiscordSnowflake` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DiscordSnowflake" DROP CONSTRAINT "DiscordSnowflake_pkey",
DROP COLUMN "exists",
DROP COLUMN "type",
ADD COLUMN     "foundAs" "DiscordSnowflakeType"[],
ADD COLUMN     "notFoundAs" "DiscordSnowflakeType"[],
ADD CONSTRAINT "DiscordSnowflake_pkey" PRIMARY KEY ("id");
