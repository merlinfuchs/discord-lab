import { GetServerSideProps, NextPage } from "next";
import { env } from "../env/server.mjs";

const DiscordRedirect: NextPage = () => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: env.DISCORD_GUILD_INVITE,
      statusCode: 302,
    },
  };
};

export default DiscordRedirect;
