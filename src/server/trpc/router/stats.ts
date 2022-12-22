import { router, publicProcedure } from "../trpc";
import { prisma } from "../../db/client";

const publicFlags = new Set([
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 16, 17, 18, 19, 22,
]);

export const statsRouter = router({
  getOverview: publicProcedure.query(async () => ({
    known_users: await prisma.discordUser.count(),
    known_guilds: await prisma.discordGuild.count(),
    known_invites: await prisma.discordInvite.count(),
    known_applications: await prisma.discordApplication.count(),
  })),
  getUserFlagsDistribution: publicProcedure.query(async ({ ctx }) => {
    const rows = await prisma.discordUser.findMany({
      where: { public_flags: { not: null } },
      select: { public_flags: true },
    });
    const flagValues = rows.map((r) => r.public_flags || 0);

    const flagCounts: { [key: string]: number } = {};
    for (const bit of publicFlags) {
      flagCounts[bit.toString()] = 0;
    }

    for (const value of flagValues) {
      for (const bit of publicFlags) {
        if ((value & (1 << bit)) !== 0) {
          flagCounts[bit.toString()] += 1;
        }
      }
    }

    return {
      sample_size: flagValues.length,
      flag_counts: flagCounts,
    };
  }),
});
