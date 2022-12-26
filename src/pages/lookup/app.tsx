import React from "react";
import ApplicationLookup from "../../components/lookup/ApplicationLookup";
import Head from "next/head";

export default function ApplicationLookupTool() {
  return (
    <div className="mt-16 flex justify-center px-3 md:px-5">
      <Head>
        <title>Lookup Application | Discord Lab</title>
      </Head>

      <div className="w-full lg:w-256">
        <h3 className="mb-2 text-4xl font-bold">Application Lookup</h3>
        <div className="mb-5 text-xl text-gray-400">
          Get information about a Discord application aka bot
        </div>
        <div className="mb-16">
          <ApplicationLookup />
        </div>
      </div>
    </div>
  );
}
