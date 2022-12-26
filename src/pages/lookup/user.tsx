import React from "react";
import Head from "next/head";
import UserLookup from "../../components/lookup/UserLookup";
import { useSession } from "next-auth/react";
import LoginPrompt from "../../components/LoginPrompt";

export default function UserLookupTool() {
  const { data: session } = useSession();

  return (
    <div className="mt-16 flex justify-center px-3 md:px-5">
      <Head>
        <title>Lookup User | Discord Lab</title>
      </Head>

      <div className="w-full lg:w-256">
        <h3 className="mb-2 text-4xl font-bold">User Lookup</h3>
        <div className="mb-5 text-xl text-gray-400">
          Get information about a user from the User ID
        </div>
        <div className="mb-16">
          {session ? <UserLookup /> : <LoginPrompt />}
        </div>
      </div>
    </div>
  );
}
