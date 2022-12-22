import React from "react";
import DecodeSnowflake from "../../components/lookup/DecodeSnowflake";
import Head from "next/head";

export default function LookupTool() {
    return (
        <div className="mt-16 flex justify-center px-3 md:px-5">
            <Head>
                <title>Decode Snowflake | Discord Toolbox</title>
            </Head>

            <div className="w-full lg:w-256">
                <h3 className="text-4xl font-bold mb-2">Snowflake Decoder</h3>
                <div className="text-gray-400 text-xl mb-5">Extract the creation date and more from a Discord ID</div>
                <div className="mb-16">
                    <DecodeSnowflake/>
                </div>
            </div>
        </div>
    )
}