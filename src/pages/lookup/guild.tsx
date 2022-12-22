import React from "react";
import GuildLookup from "../../components/lookup/GuildLookup";
import Head from "next/head";

export default function LookupTool() {
    return (
        <div className="mt-16 flex justify-center px-3 md:px-5">
            <Head>
                <title>Lookup Server | Discord Toolbox</title>
            </Head>

            <div className="w-full lg:w-256">
                <h3 className="text-4xl font-bold mb-2">Server Lookup</h3>
                <div className="text-gray-400 text-xl mb-5">Get information about a server from the Server ID</div>
                <div className="mb-16">
                    <GuildLookup/>
                </div>
            </div>
        </div>
    )
}