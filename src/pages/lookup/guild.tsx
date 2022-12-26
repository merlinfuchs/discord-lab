import React from "react";
import GuildLookup from "../../components/lookup/GuildLookup";
import Head from "next/head";
import { useSession } from "next-auth/react";
import LoginPrompt from "../../components/LoginPrompt";

export default function LookupTool() {
  const { data: session } = useSession();

  if (!session) {
    return <LoginPrompt />;
  }

  return (
    <div className="mt-16 flex justify-center px-3 md:px-5">
      <Head>
        <title>Lookup Server | Discord Lab</title>
      </Head>

      <div className="w-full lg:w-256">
        <h3 className="mb-2 text-4xl font-bold">Server Lookup</h3>
        <div className="mb-5 text-xl text-gray-400">
          Get information about a server from the Server ID
        </div>
        <div className="mb-16">
          {session ? <GuildLookup /> : <LoginPrompt />}
        </div>
      </div>
    </div>
  );
}
