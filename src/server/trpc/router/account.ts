import { router, protectedProcedure } from "../trpc";
import { prisma } from "../../db/client";
import { REST } from "@discordjs/rest";
import { APIGuild, APIUser, Routes } from "discord-api-types/v10";
import { rememberFoundSnowflakes } from "./lookup";

export const accountRouter = router({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const account = await prisma.account.findFirst({
      where: { userId: ctx.session.user.id, provider: "discord" },
    });

    if (!account || !account.access_token) {
      return null;
    }

    const rest = new REST({ version: "10" }).setToken(account.access_token);

    const user = await rest
      .get(Routes.user("@me"), { authPrefix: "Bearer" })
      .then((u) => u as APIUser)
      .catch(() => null);

    if (user) {
      rememberFoundSnowflakes([user.id], "USER");
    }

    return user;
  }),
  getGuilds: protectedProcedure.query(async ({ ctx }) => {
    const account = await prisma.account.findFirst({
      where: { userId: ctx.session.user.id, provider: "discord" },
    });

    if (!account || !account.access_token) {
      return [];
    }

    const rest = new REST({ version: "10" }).setToken(account.access_token);

    const guilds = await rest
      .get(Routes.userGuilds(), { authPrefix: "Bearer" })
      .then((g) => g as (APIGuild & { id: string })[])
      .catch(() => []);

    rememberFoundSnowflakes(
      guilds.map((g) => g.id),
      "GUILD"
    );

    return guilds;
  }),
});
