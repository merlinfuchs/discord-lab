import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPrompt() {
  return (
    <div className="rounded-md bg-dark-3 p-5">
      <div className="mb-1 text-2xl font-bold">Please Login</div>
      <div className="mb-4 text-lg text-gray-300">
        This tool requires you to login with your Discord Account. Discord Lab
        does not store any permanent information your Discord account or the
        servers that you are in.
      </div>
      <div className="flex">
        <button
          onClick={() => signIn("discord")}
          className="block transform rounded-md bg-green-500 px-5 py-2 text-xl transition-transform hover:scale-103"
        >
          Login
        </button>
      </div>
    </div>
  );
}
