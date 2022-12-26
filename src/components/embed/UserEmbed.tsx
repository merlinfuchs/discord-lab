import { DiscordUser } from "@prisma/client";
import Head from "next/head";
import { FunctionComponent } from "react";
import {
  formatDateTime,
  hasBitFlag,
  intToHexColor,
  snowlfakeTimestamp,
} from "../../utils/discord";
import { env } from "../../env/client.mjs";

const UserEmbed: FunctionComponent<{
  user: DiscordUser;
}> = ({ user }) => {
  function userUrl() {
    return `https://discord.com/users/${user.id}`;
  }

  function embedImageUrl() {
    return `${env.NEXT_PUBLIC_PUBLIC_BASE_URL}/api/img/users/${user.id}`;
  }

  function userTag() {
    return `${user.username}#${user.discriminator}`;
  }

  function createdAt() {
    return formatDateTime(snowlfakeTimestamp(user.id) || new Date());
  }

  function embedColor() {
    if (user.accent_color) {
      return intToHexColor(user.accent_color);
    } else {
      return "#2f3136";
    }
  }

  function badges() {
    const badges = {
      0: "Discord Staff",
      1: "Discord Partner",
      2: "Hypesquad Events",
      3: "Bug Hunter",
      6: "Hypesquad Bravery",
      7: "Hypesquad Brilliance",
      8: "Hypesquad Balance",
      9: "Early Supporter",
      14: "Bug Hunter",
      16: "Verified Bot",
      17: "Early Verified Bot Developer",
      18: "Certified Moderator",
    };

    return Object.entries(badges)
      .filter(([bit]) => hasBitFlag(user.public_flags, parseInt(bit)))
      .map(([, name]) => name)
      .join("\n");
  }

  return (
    <Head>
      <title>{userTag()}</title>
      <meta http-equiv="refresh" content={`0; URL=${userUrl()}`}></meta>
      <meta property="og:title" content={userTag()} />
      <meta
        data-react-helmet="true"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta property="og:url" content={userUrl()} />
      <meta property="og:image" content={embedImageUrl()} />
      <meta property="og:site_name" content={user.id} />
      <meta
        property="og:description"
        content={`Created At: ${createdAt()}\n\n${badges()}`}
      />
      <meta property="theme-color" content={embedColor()} />
    </Head>
  );
};

export default UserEmbed;
