import Head from "next/head";
import AccountServers from "../../components/account/AccountServers";
import EmbedLinkCreator from "../../components/embed/EmbedLinkCreator";
import LoginPrompt from "../../components/LoginPrompt";

export default function EmbedLinkTool() {
  return (
    <div className="mt-16 flex justify-center px-3 md:px-5">
      <Head>
        <title>Embed Links | Discord Lab</title>
      </Head>

      <div className="w-full lg:w-256">
        <h3 className="mb-2 text-4xl font-bold">Embed User</h3>
        <div className="mb-5 text-xl text-gray-400">
          Create a link to embed a user or application in a Discord message
        </div>
        <div className="mb-16">
          <EmbedLinkCreator placeholder="386861188891279362" />
        </div>

        <h3 className="mb-2 text-4xl font-bold">Embed Server</h3>
        <div className="mb-5 text-xl text-gray-400">
          Create a link to embed a server in a Discord message
        </div>
        <div className="mb-16">
          <EmbedLinkCreator placeholder="410488579140354049" prefix="/g" />
        </div>
      </div>
    </div>
  );
}
