import {
  DiscordApplication,
  DiscordGuild,
  DiscordSnowflakeType,
  DiscordUser,
} from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import {
  getApplication,
  getGuild,
  getSnowflake,
  getUser,
} from "../server/trpc/router/lookup";
import superjson from "superjson";

interface Props {
  id: string;
  type: string | null;
  timestamp: string;
  data: string;
}

const Embed: NextPage<Props> = ({ type, data }) => {
  if (type === "APPLICATION") {
    const application: DiscordApplication = superjson.parse(data);
    return (
      <Head>
        <title>{application.name} | Discord App</title>
      </Head>
    );
  } else if (type === "GUILD") {
    const guild: DiscordGuild = superjson.parse(data);
    return (
      <Head>
        <title>{guild.name} | Discord Server</title>
      </Head>
    );
  } else if (type === "USER") {
    const user: DiscordUser = superjson.parse(data);
    return (
      <Head>
        <title>{user.username} | Discord User</title>
      </Head>
    );
  } else {
    return (
      <Head>
        <title>Embed | Discord Toolbox</title>
      </Head>
    );
  }
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const args = context.query.embed as string[];

  let type: DiscordSnowflakeType | null = null;
  let id = "";
  if (args.length >= 2) {
    id = args[1]!;
    switch (args[0]) {
      case "a":
        type = "APPLICATION";
        break;
      case "u":
        type = "USER";
        break;
      case "g":
        type = "GUILD";
        break;
      case "s":
        type = "GUILD";
        break;
    }
  } else {
    id = args[0]!;
  }

  console.log(id);

  const snowflake = await getSnowflake(id);
  if (!snowflake) {
    return {
      notFound: true,
    };
  }

  if (!type) {
    type = snowflake.type;
  }

  let data = null;
  switch (type) {
    case "APPLICATION":
      data = await getApplication(id);
      break;
    case "GUILD":
      data = await getGuild(id);
      break;
    default:
      data = await getUser(id);
      break;
  }

  return {
    props: {
      id,
      type,
      timestamp: snowflake?.timestamp.toISOString(),
      data: superjson.stringify(data),
    },
  };
};

export default Embed;
