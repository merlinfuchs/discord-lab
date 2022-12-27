import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

export default function NavBar() {
  const router = useRouter();

  const [toolsOpen, setToolsOpen] = useState(false);

  function isPathActive(path: string) {
    return router.pathname.startsWith(path);
  }

  return (
    <div>
      <div className="fixed top-0 right-0 left-0 z-50 w-screen bg-dark-3">
        <div className="flex h-22 items-center justify-center px-5">
          <div className="flex w-full xl:w-304">
            <div className="mr-5 flex-initial">
              <Link href="/">
                <img
                  src="/logo.svg"
                  alt=""
                  className="h-14 w-14 transform transition-transform hover:scale-105"
                />
              </Link>
            </div>
            <div
              className="relative flex flex-auto items-center text-gray-300"
              onClick={() => setToolsOpen(!toolsOpen)}
            >
              <button className="flex items-center text-xl lg:hidden">
                <div className="mr-2">Tools</div>
                <div className="h-6 w-6">
                  {toolsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </div>
              </button>
              <div
                className={`absolute left-0 top-12 flex flex-auto flex-col rounded-md bg-dark-5 px-3 py-2 lg:static lg:flex-row lg:items-center lg:bg-transparent lg:p-0 ${
                  toolsOpen ? "block" : "hidden lg:flex"
                }`}
              >
                <div className="mb-3 flex flex-auto flex-col space-y-2 lg:mb-0 lg:flex-row lg:items-center lg:space-y-0">
                  <Link
                    href="/status"
                    className={`mr-8 text-xl hover:text-blue-400 ${
                      isPathActive("/status") ? "text-blue-400" : ""
                    }`}
                  >
                    Status
                  </Link>
                  <Link
                    href="/account"
                    className={`mr-8 text-xl hover:text-blue-400 ${
                      isPathActive("/account") ? "text-blue-400" : ""
                    }`}
                  >
                    Account Info
                  </Link>
                  <a
                    href="https://url.wtf"
                    target="_blank"
                    rel="noreferrer"
                    className={`mr-8 text-xl hover:text-blue-400`}
                  >
                    Embeddable Links
                  </a>
                </div>

                <div className="flex flex-initial items-center text-gray-100">
                  <a
                    href="https://wiki.distools.app"
                    target="_blank"
                    rel="noreferrer"
                    className="mr-3 block transform rounded-md bg-dark-3 px-5 py-2 text-xl transition-transform hover:scale-103 lg:bg-dark-5"
                  >
                    Wiki
                  </a>
                  <a
                    href="/discord"
                    target="_blank"
                    rel="noreferrer"
                    className="block transform rounded-md bg-blue-500 px-5 py-2 text-xl transition-transform hover:scale-103"
                  >
                    Discord
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-dark-3 pb-22" />
    </div>
  );
}
