import React from "react";
import DecodeSnowflake from "../../components/lookup/DecodeSnowflake";
import Head from "next/head";

export default function LookupTool() {
  return (
    <div className="mt-16 flex justify-center px-3 md:px-5">
      <Head>
        <title>Decode Snowflake | Discord Lab</title>
      </Head>

      <div className="w-full lg:w-256">
        <h3 className="mb-2 text-4xl font-bold">Snowflake Decoder</h3>
        <div className="mb-5 text-xl text-gray-400">
          Extract the creation date and more from a Discord ID
        </div>
        <div className="mb-16">
          <DecodeSnowflake />
        </div>
      </div>
    </div>
  );
}
