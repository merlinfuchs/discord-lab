import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { REST } from "@discordjs/rest";
import {
  Routes,
  APIUser,
  APIGuildPreview,
  APIApplication,
  APIGuildWidget,
  APIInvite,
} from "discord-api-types/v10";
import { prisma } from "../../db/client";
import {
  DiscordApplication,
  DiscordGuild,
  DiscordInvite,
  DiscordSnowflakeType,
  DiscordUser,
} from "@prisma/client";
import { env } from "../../../env/server.mjs";
import { snowlfakeTimestamp } from "../../../utils/discord";

const rest = new REST({ version: "10" }).setToken(env.DISCORD_BOT_TOKEN);

export const lookupRouter = router({
  getUser: protectedProcedure
    .input(z.string())
    .query(({ input }) => getUser(input)),
  getGuild: protectedProcedure
    .input(z.string())
    .query(({ input }) => getGuild(input)),
  getApplication: protectedProcedure
    .input(z.string())
    .query(({ input }) => getApplication(input)),
  getInvite: protectedProcedure
    .input(z.string())
    .query(({ input }) => getInvite(input)),
  getSnowflake: protectedProcedure
    .input(z.string())
    .query(({ input }) => getSnowflake(input)),
});

export async function getUser(id: string): Promise<DiscordUser | null> {
  const cached = await prisma.discordUser.findFirst({
    where: { id, fetched_at: { gt: new Date(Date.now() - 1000 * 60 * 60) } },
  });
  if (cached) {
    return cached;
  }

  try {
    const user = (await rest.get(Routes.user(id))) as APIUser;

    rememberSnowflakes([id], "USER");

    const row: DiscordUser = {
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      avatar: user.avatar,
      bot: user.bot ?? null,
      banner: user.banner ?? null,
      accent_color: user.accent_color ?? null,
      public_flags: user.public_flags ?? null,
      fetched_at: new Date(),
    };

    await prisma.discordUser.upsert({
      where: { id },
      update: row,
      create: row,
    });
    return row;
  } catch {
    return null;
  }
}

export async function getGuild(id: string): Promise<DiscordGuild | null> {
  const cached = await prisma.discordGuild.findFirst({
    where: { id, fetched_at: { gt: new Date(Date.now() - 1000 * 60 * 60) } },
  });
  if (cached) {
    return cached;
  }

  try {
    const [preview, widget] = await Promise.all([
      rest
        .get(Routes.guildPreview(id))
        .then((p) => p as APIGuildPreview)
        .catch(() => null),
      rest
        .get(Routes.guildWidgetJSON(id))
        .then((w) => w as APIGuildWidget)
        .catch(() => null),
    ]);

    if (!preview && !widget) {
      return null;
    }

    rememberSnowflakes([id], "GUILD");
    rememberSnowflakes(
      preview?.emojis?.filter((e) => !!e.id).map((e) => e.id!) || [],
      "EMOJI"
    );
    rememberSnowflakes(
      preview?.stickers?.filter((e) => !!e.id).map((e) => e.id!) || [],
      "STICKER"
    );
    rememberSnowflakes(
      widget?.channels?.filter((e) => !!e.id).map((e) => e.id!) || [],
      "CHANNEL"
    );

    const row: DiscordGuild = {
      id: preview?.id || widget?.id || "",
      name: preview?.name || widget?.name || "",
      icon: preview?.icon || null,
      splash: preview?.splash || null,
      discovery_splash: preview?.discovery_splash || null,
      emojis: (preview?.emojis || []) as [],
      features: preview?.features || [],
      approximate_member_count: preview?.approximate_member_count || null,
      approximate_presence_count: preview?.approximate_presence_count || null,
      description: preview?.description || null,
      stickers: (preview?.stickers || []) as any[],
      instant_invite: widget?.instant_invite || null,
      members: (widget?.members || []) as any[],
      channels: (widget?.channels || []) as any[],
      presence_count: widget?.presence_count || null,
      fetched_at: new Date(),
    };

    await prisma.discordGuild.upsert({
      where: { id },
      update: row,
      create: row,
    });
    return row;
  } catch {
    return null;
  }
}

export async function getApplication(
  id: string
): Promise<DiscordApplication | null> {
  const cached = await prisma.discordApplication.findFirst({
    where: { id, fetched_at: { gt: new Date(Date.now() - 1000 * 60 * 60) } },
  });
  if (cached) {
    return cached;
  }

  try {
    const app = (await rest.get(`/applications/${id}/rpc`)) as APIApplication;

    rememberSnowflakes([id], "APPLICATION");

    const row: DiscordApplication = {
      id: app.id,
      name: app.name,
      icon: app.icon,
      description: app.description,
      bot_public: app.bot_public,
      bot_require_code_grant: app.bot_require_code_grant,
      terms_of_service_url: app.terms_of_service_url || null,
      privacy_policy_url: app.privacy_policy_url || null,
      verify_key: app.verify_key,
      primary_sku_id: app.primary_sku_id || null,
      slug: app.slug || null,
      flags: app.flags,
      tags: app.tags as string[],
      custom_install_url: app.custom_install_url || null,
      role_connections_verification_url:
        app.role_connections_verification_url || null,
      fetched_at: new Date(),
    };

    await prisma.discordApplication.upsert({
      where: { id },
      update: row,
      create: row,
    });
    return row;
  } catch {
    return null;
  }
}

export async function getInvite(code: string): Promise<DiscordInvite | null> {
  const cached = await prisma.discordInvite.findFirst({
    where: { code, fetched_at: { gt: new Date(Date.now() - 1000 * 60 * 60) } },
  });
  if (cached) {
    return cached;
  }

  try {
    const invite = (await rest.get(Routes.invite(code), {
      query: new URLSearchParams({ with_counts: "1", with_expiration: "1" }),
    })) as APIInvite;

    if (invite.guild) {
      rememberSnowflakes([invite.guild.id], "GUILD");
    }

    if (invite.channel) {
      rememberSnowflakes([invite.channel.id], "CHANNEL");
    }

    if (invite.inviter) {
      rememberSnowflakes([invite.inviter.id], "USER");
    }

    if (invite.target_user) {
      rememberSnowflakes([invite.target_user.id], "USER");
    }

    const row = {
      code: invite.code,
      guild: (invite.guild as any) || undefined,
      channel: (invite.channel as any) || undefined,
      inviter: (invite.inviter as any) || undefined,
      target_type: invite.target_type || null,
      target_user: (invite.target_user as any) || undefined,
      target_application: (invite.target_application as any) || undefined,
      approximate_member_count: invite.approximate_member_count || null,
      approximate_presence_count: invite.approximate_presence_count || null,
      expires_at: invite.expires_at ? new Date(invite.expires_at) : null,
      guild_scheduled_event: (invite.guild_scheduled_event as any) || undefined,
      fetched_at: new Date(),
    };

    await prisma.discordInvite.upsert({
      where: { code },
      update: row,
      create: row,
    });
    return row;
  } catch {
    return null;
  }
}

export async function getSnowflake(id: string) {
  const timestamp = snowlfakeTimestamp(id);
  if (!timestamp) {
    return null;
  }

  const info = await prisma.discordSnowflake.findFirst({
    where: { id, exists: true },
  });

  return {
    timestamp,
    type: info?.type || null,
  };
}

export async function rememberSnowflakes(
  ids: string[],
  type: DiscordSnowflakeType
) {
  await prisma.discordSnowflake.createMany({
    data: ids.map((id) => ({ id, type, exists: true })),
  });
}
