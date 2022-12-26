import React from "react";
import ResolveInvite from "../../components/lookup/ResolveInvite";
import Head from "next/head";

export default function LookupTool() {
  return (
    <div className="mt-16 flex justify-center px-3 md:px-5">
      <Head>
        <title>Resolve Invite | Discord Lab</title>
      </Head>

      <div className="w-full lg:w-256">
        <h3 className="mb-2 text-4xl font-bold">Invite Resolver</h3>
        <div className="mb-5 text-xl text-gray-400">
          Extract information about a server and more from an invite
        </div>
        <div className="mb-16">
          <ResolveInvite />
        </div>
      </div>
    </div>
  );
}
