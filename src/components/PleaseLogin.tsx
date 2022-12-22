import Link from "next/link";

export default function PleaseLogin() {
    return (
        <div className="p-5 rounded-md bg-dark-3">
            <div className="text-2xl font-bold mb-1">Please Login</div>
            <div className="text-gray-300 text-lg mb-4">This tool requires you to login with your Discord Account.
                Discord
                Toolbox does not store any permanent information your Discord account or the servers that you are in.
            </div>
            <div className="flex">
                <Link href="/login" passHref>
                    <a className="block px-5 py-2 text-xl bg-green-500 rounded-md transform hover:scale-103 transition-transform">Login</a>
                </Link>
            </div>
        </div>
    )
}