import Head from "next/head";
import React from "react";
import VoiceLatency from "../../components/status/VoiceLatency";
import StagingStatus from "../../components/status/StagingStatus";

export default function StatusTool() {
  return (
    <div className="mt-16 flex justify-center px-3 md:px-5">
      <Head>
        <title>Discord Status | Discord Toolbox</title>
      </Head>

      <div className="w-full lg:w-256">
        <h3 className="mb-2 text-4xl font-bold">Discord Staging</h3>
        <div className="mb-5 text-xl text-gray-400">
          The current status of the one and only{" "}
          <a
            href="https://staging.discord.co"
            target="_blank"
            rel="noreferrer"
            className="text-blue-200"
          >
            Discord Staging
          </a>
        </div>
        <div className="mb-16">
          <StagingStatus />
        </div>

        <h3 className="mb-2 text-4xl font-bold">RTC Latency</h3>
        <div className="mb-5 text-xl text-gray-400">
          The RTC locations with the lowest latency for your location (this is
          kinda pointless)
        </div>
        <div className="mb-16">
          <VoiceLatency />
        </div>
      </div>
    </div>
  );
}
