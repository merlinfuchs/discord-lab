import React from "react";
import ResolveInvite from "../../components/lookup/ResolveInvite";
import Head from "next/head";

export default function LookupTool() {
    return (
        <div className="mt-16 flex justify-center px-3 md:px-5">
            <Head>
                <title>Resolve Invite | Discord Toolbox</title>
            </Head>

            <div className="w-full lg:w-256">
                <h3 className="text-4xl font-bold mb-2">Invite Resolver</h3>
                <div className="text-gray-400 text-xl mb-5">Extract information about a server and more from an invite
                </div>
                <div className="mb-16">
                    <ResolveInvite/>
                </div>
            </div>
        </div>
    )
}