import { type DiscordApplication } from "@prisma/client";
import Head from "next/head";
import { type FunctionComponent } from "react";
import { env } from "../../env/client.mjs";
import {
  cleanRawContent,
  formatDateTime,
  snowlfakeTimestamp,
} from "../../utils/discord";

const ApplicationEmbed: FunctionComponent<{
  app: DiscordApplication;
}> = ({ app }) => {
  function appUrl() {
    if (app.custom_install_url) {
      return app.custom_install_url;
    } else {
      return `https://`;
    }
  }

  function embedImageUrl() {
    return `${env.NEXT_PUBLIC_PUBLIC_BASE_URL}/api/img/users/${app.id}`;
  }

  function createdAt() {
    return formatDateTime(snowlfakeTimestamp(app.id) || new Date());
  }

  function appDescription() {
    if (app && app.description && app.description.length) {
      return `${cleanRawContent(app.description)}\n\n`;
    }
    return "";
  }

  return (
    <Head>
      <title>{app.name}</title>
      <meta http-equiv="refresh" content={`0; URL=${appUrl()}`}></meta>
      <meta property="og:title" content={app.name} />
      <meta
        data-react-helmet="true"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta property="og:url" content={appUrl()} />
      <meta property="og:image" content={embedImageUrl()} />
      <meta property="og:site_name" content={app.id} />
      <meta
        property="og:description"
        content={`Created At: ${createdAt()}\n\n${appDescription()}`}
      />
      <meta property="theme-color" content="#2f3136" />
    </Head>
  );
};

export default ApplicationEmbed;
