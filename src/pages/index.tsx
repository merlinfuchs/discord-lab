import { type NextPage } from "next";
import {
  LinkIcon,
  BuildingOfficeIcon,
  HeartIcon,
  UserIcon,
  CommandLineIcon,
  IdentificationIcon,
  PaperClipIcon,
  CogIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <div className="mb-16 bg-dark-3 py-32 px-5 text-center">
        <h1 className="mb-8 text-6xl font-bold">Discord Lab</h1>
        <div className="mb-8 text-2xl text-gray-400">
          Tools for all the fellow Discord power users and nerds out there
        </div>
        <div className="flex flex-wrap justify-center">
          <a
            href="https://wiki.distools.app"
            target="_blank"
            rel="noreferrer"
            className="mr-3 block transform rounded-md bg-dark-5 px-4 py-2 text-xl transition-transform hover:scale-103"
          >
            Wiki
          </a>
          <a
            href="/discord"
            target="_blank"
            rel="noreferrer"
            className="block transform rounded-md bg-blue-500 px-4 py-2 text-xl transition-transform hover:scale-103"
          >
            Join our Discord
          </a>
        </div>
      </div>
      <div className="mb-16 flex justify-center px-3 md:px-5">
        <div className="w-full xl:w-304">
          <Link
            href="/lookup/snowflake"
            className="mb-4 block flex transform items-center rounded-md bg-dark-4 p-5 transition-transform hover:scale-101"
          >
            <div className="mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-400 text-4xl">
              <CogIcon className="h-12 w-12" />
            </div>
            <div>
              <div className="text-xl font-bold">Snowflake Decoder</div>
              <div className="text-gray-400">
                Extract the creation date and more from a Discord ID
              </div>
            </div>
          </Link>
          <Link
            href="/lookup/user"
            className="mb-4 block flex transform items-center rounded-md bg-dark-4 p-5 transition-transform hover:scale-101"
          >
            <div className="mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-400 text-4xl">
              <UserIcon className="h-12 w-12" />
            </div>
            <div>
              <div className="text-xl font-bold">User Lookup</div>
              <div className="text-gray-400">
                Get information about a user from the user ID
              </div>
            </div>
          </Link>
          <Link
            href="/lookup/guild"
            className="mb-4 block flex transform items-center rounded-md bg-dark-4 p-5 transition-transform hover:scale-101"
          >
            <div className="mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-400 text-4xl">
              <BuildingOfficeIcon className="h-12 w-12" />
            </div>
            <div>
              <div className="text-xl font-bold">Server Lookup</div>
              <div className="text-gray-400">
                Get information about a server from the server ID
              </div>
            </div>
          </Link>
          <Link
            href="/lookup/invite"
            className="mb-4 block flex transform items-center rounded-md bg-dark-4 p-5 transition-transform hover:scale-101"
          >
            <div className="mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-400 text-4xl">
              <LinkIcon className="h-12 w-12" />
            </div>
            <div>
              <div className="text-xl font-bold">Invite Resolver</div>
              <div className="text-gray-400">
                Extract information about a server and more from an invite
              </div>
            </div>
          </Link>
          <Link
            href="/lookup/app"
            className="mb-4 block flex transform items-center rounded-md bg-dark-4 p-5 transition-transform hover:scale-101"
          >
            <div className="mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-400 text-4xl">
              <CommandLineIcon className="h-12 w-12" />
            </div>
            <div>
              <div className="text-xl font-bold">Application Lookup</div>
              <div className="text-gray-400">
                Get information about a Discord application from the application
                ID
              </div>
            </div>
          </Link>
          <Link
            href="/account"
            className="mb-4 block flex transform items-center rounded-md bg-dark-4 p-5 transition-transform hover:scale-101"
          >
            <div className="mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-400 text-4xl">
              <IdentificationIcon className="h-12 w-12" />
            </div>
            <div>
              <div className="text-xl font-bold">Account Info</div>
              <div className="text-gray-400">
                Get information about your Discord account and the servers you
                are in
              </div>
            </div>
          </Link>
          <a
            href="https://url.wtf"
            target="_blank"
            rel="noreferrer"
            className="mb-4 block flex transform items-center rounded-md bg-dark-4 p-5 transition-transform hover:scale-101"
          >
            <div className="mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-400 text-4xl">
              <PaperClipIcon className="h-12 w-12" />
            </div>
            <div>
              <div className="text-xl font-bold">Embeddable Links</div>
              <div className="text-gray-400">
                Easy to use links to embed users, servers, and invites on
                Discord
              </div>
            </div>
          </a>
          <Link
            href="/status"
            className="mb-4 block flex transform items-center rounded-md bg-dark-4 p-5 transition-transform hover:scale-101"
          >
            <div className="mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-400 text-4xl">
              <HeartIcon className="h-12 w-12" />
            </div>
            <div>
              <div className="text-xl font-bold">Discord Status</div>
              <div className="text-gray-400">
                View the current discord status and some extra info
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
