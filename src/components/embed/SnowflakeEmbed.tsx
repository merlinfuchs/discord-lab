import Head from "next/head";
import { FunctionComponent } from "react";
import { formatDateTime, snowlfakeTimestamp } from "../../utils/discord";

const SnowflakeEmbed: FunctionComponent<{ id: string }> = ({ id }) => {
  function createdAt() {
    return formatDateTime(snowlfakeTimestamp(id) || new Date());
  }

  return (
    <Head>
      <title>Discord Snowflake</title>
      <meta property="og:title" content="Unknown Snowflake" />
      <meta property="og:type" content="profile" />
      <meta property="og:url" content={"https://discord.com"} />
      <meta property="og:site_name" content={id} />
      <meta property="og:description" content={`Created At: ${createdAt()}`} />
      <meta property="theme-color" content="#2f3136" />
    </Head>
  );
};

export default SnowflakeEmbed;
