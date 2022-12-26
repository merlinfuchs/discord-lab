//@ts-ignore
import emojiNames from "emoji-name-map";

const DISCORD_CDN = "https://cdn.discordapp.com";

export function userAvatar(
  {
    id,
    discriminator,
    avatar,
  }: { id: string; discriminator: string; avatar: string | null },
  { size = 512 }
) {
  if (avatar) {
    if (avatar.startsWith("a_")) {
      return `${DISCORD_CDN}/avatars/${id}/${avatar}.gif?size=${size}`;
    } else {
      return `${DISCORD_CDN}/avatars/${id}/${avatar}.png?size=${size}`;
    }
  } else {
    return `${DISCORD_CDN}/embed/avatars/${
      parseInt(discriminator) % 5
    }.png?size=${size}`;
  }
}

export function userBanner({
  id,
  banner,
}: {
  id: string;
  banner?: string | null | undefined;
}) {
  if (!banner) return null;

  if (banner.startsWith("a_")) {
    return `${DISCORD_CDN}/banners/${id}/${banner}.gif?size=1024`;
  } else {
    return `${DISCORD_CDN}/banners/${id}/${banner}.png?size=1024`;
  }
}

export function guildIcon(
  { id, icon }: { id: string; icon: string | null },
  { size = 512 }
) {
  if (icon) {
    return `${DISCORD_CDN}/icons/${id}/${icon}.webp?size=${size}`;
  } else {
    return `${DISCORD_CDN}/embed/avatars/1.png?size=${size}`;
  }
}

export function applicationIcon(
  { id, icon }: { id: string; icon: string | null },
  { size = 128 }
) {
  if (icon) {
    return `${DISCORD_CDN}/app-icons/${id}/${icon}.webp?size=${size}`;
  } else {
    return `${DISCORD_CDN}/embed/avatars/1.png?size=${size}`;
  }
}

export function hasBitFlag(value: number | null, bit: number) {
  if (!value) return false;

  const shifted = 1 << bit;
  return (value & shifted) === shifted;
}

export function formatDateTime(date: Date) {
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return formatDateTime(date);
}

export function intToHexColor(int: number) {
  let hex = Number(int).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return `#${hex}`;
}

export function snowlfakeTimestamp(snowflake: string) {
  if (!snowflake) return null;

  const epoch = 1420070400000;
  // @ts-ignore
  const timestamp = new Date(snowflake / 4194304 + epoch);
  if (!timestamp || isNaN(timestamp.getTime())) {
    return null;
  } else {
    return timestamp;
  }
}
export function cleanRawContent(content: string) {
  return content
    .replaceAll(/:[a-zA-Z0-9-_]+:/g, (match) => {
      const emoji = emojiNames.get(match);
      if (emoji) return emoji;
      return match;
    })
    .replaceAll(/\*\*(.+)\*\*/g, (_, text) => text)
    .replaceAll(/\*(.+)\*/g, (_, text) => text)
    .replaceAll(/__(.+)__/g, (_, text) => text)
    .replaceAll(/_(.+)_/g, (_, text) => text)
    .replaceAll(/~~(.+)~~/g, (_, text) => text);
}

export const snowflakeRegex = /^[0-9]+$/;
