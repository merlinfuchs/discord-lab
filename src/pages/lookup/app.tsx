import React from "react";
import ApplicationLookup from "../../components/lookup/ApplicationLookup";
import Head from "next/head";

export default function ApplicationLookupTool() {
    return (
        <div className="mt-16 flex justify-center px-3 md:px-5">
            <Head>
                <title>Lookup Application | Discord Toolbox</title>
            </Head>

            <div className="w-full lg:w-256">
                <h3 className="text-4xl font-bold mb-2">Application Lookup</h3>
                <div className="text-gray-400 text-xl mb-5">Get information about a Discord application aka bot</div>
                <div className="mb-16">
                    <ApplicationLookup/>
                </div>
            </div>
        </div>
    )
}