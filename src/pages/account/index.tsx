import { useSession } from "next-auth/react";
import Head from "next/head";
import AccountInfo from "../../components/account/AccountInfo";
import AccountServers from "../../components/account/AccountServers";
import LoginPrompt from "../../components/LoginPrompt";

export default function AccountInfoTool() {
  const { data: session } = useSession();

  return (
    <div className="mt-16 flex justify-center px-3 md:px-5">
      <Head>
        <title>Account Info | Discord Lab</title>
      </Head>

      <div className="w-full lg:w-256">
        <h3 className="mb-2 text-4xl font-bold">Account Info</h3>
        <div className="mb-5 text-xl text-gray-400">
          Information about your Discord account
        </div>
        <div className="mb-16">
          {session ? <AccountInfo /> : <LoginPrompt />}
        </div>

        <h3 className="mb-2 text-4xl font-bold">Your Servers</h3>
        <div className="mb-5 text-xl text-gray-400">
          Information about the Discord servers that you are in
        </div>
        <div className="mb-16">
          {session ? <AccountServers /> : <LoginPrompt />}
        </div>
      </div>
    </div>
  );
}
