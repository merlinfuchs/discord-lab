import {useUser} from "../../hooks/user";
import {useGuilds} from "../../hooks/guilds";
import Head from "next/head";
import AccountInfo from "../../components/account/AccountInfo";
import AccountServers from "../../components/account/AccountServers";

export default function AccountInfoTool() {
    const user = useUser()
    const guilds = useGuilds()

    return (
        <div className="mt-16 flex justify-center px-3 md:px-5">
            <Head>
                <title>Account Info | Discord Toolbox</title>
            </Head>

            <div className="w-full lg:w-256">
                <h3 className="text-4xl font-bold mb-2">Account Info</h3>
                <div className="text-gray-400 text-xl mb-5">Information about your Discord account</div>
                <div className="mb-16">
                    <AccountInfo/>
                </div>

                <h3 className="text-4xl font-bold mb-2">Your Servers</h3>
                <div className="text-gray-400 text-xl mb-5">Information about the Discord servers that you are in</div>
                <div className="mb-16">
                    <AccountServers/>
                </div>
            </div>
        </div>
    )
}