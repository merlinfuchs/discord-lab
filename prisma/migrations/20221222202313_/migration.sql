/*
  Warnings:

  - The primary key for the `DiscordSnowflake` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `type` on the `DiscordSnowflake` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DiscordSnowflakeType" AS ENUM ('USER', 'GUILD', 'CHANNEL', 'ROLE', 'APPLICATION');

-- AlterTable
ALTER TABLE "DiscordSnowflake" DROP CONSTRAINT "DiscordSnowflake_pkey",
DROP COLUMN "type",
ADD COLUMN     "type" "DiscordSnowflakeType" NOT NULL,
ADD CONSTRAINT "DiscordSnowflake_pkey" PRIMARY KEY ("id", "type");
