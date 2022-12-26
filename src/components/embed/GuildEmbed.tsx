import { type DiscordGuild } from "@prisma/client";
import Head from "next/head";
import { type FunctionComponent } from "react";
import {
  cleanRawContent,
  formatDateTime,
  guildIcon,
  snowlfakeTimestamp,
} from "../../utils/discord";

const GuildEmbed: FunctionComponent<{ guild: DiscordGuild }> = ({ guild }) => {
  function guildUrl() {
    if (guild.instant_invite) {
      return guild.instant_invite;
    } else {
      return `https://distools.app/lookup/guild?guild_id=${guild.id}`;
    }
  }

  function guildAttributes() {
    let result = "";
    if (guild.approximate_member_count) {
      result += `Members: ${guild.approximate_member_count}\n`;
    }
    const member_count = guild.presence_count || guild.approximate_member_count;
    if (member_count) {
      result += `Online Members: ${member_count}\n`;
    }
    if (guild.features) {
      if (guild.features.includes("PARTNERED")) {
        result += "Partnered Server";
      }

      if (guild.features.includes("VERIFIED")) {
        result += "Verified Server";
      }
    }
    return result;
  }

  function createdAt() {
    return formatDateTime(snowlfakeTimestamp(guild.id) || new Date());
  }

  function guildDescription() {
    if (guild.description && guild.description.length) {
      return `${cleanRawContent(guild.description)}\n\n`;
    }
    return "";
  }

  return (
    <Head>
      <title>{guild.name}</title>
      <meta http-equiv="refresh" content={`0; URL=${guildUrl()}`}></meta>
      <meta property="og:title" content={guild.name} />
      <meta property="og:type" content="profile" />
      <meta property="og:url" content={guildUrl()} />
      <meta property="og:image" content={guildIcon(guild, {}) ?? ""} />
      <meta property="og:site_name" content={guild.id} />
      <meta
        property="og:description"
        content={`Created At: ${createdAt()}\n\n${guildDescription()}${guildAttributes()}`}
      />
      <meta property="theme-color" content="#2f3136" />
    </Head>
  );
};

export default GuildEmbed;
