import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { applicationIcon, hasBitFlag } from "../../utils/discord";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

export default function ApplicationLookup() {
  const [appId, setAppId] = useState("");

  const router = useRouter();

  const query = trpc.lookup.getApplication.useQuery(appId, {
    enabled: false,
  });

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.app_id && !appId) {
      setAppId(router.query.app_id.toString());
      query.refetch();
    }
  }, [router]);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setAppId(e.target.value.replace(/\D/g, "").trim());
  }

  return (
    <div className="rounded-md bg-dark-3 p-5">
      <div className="mb-5 text-lg text-gray-300">
        Please enter a valid Discord application ID below to look it up. The
        application ID is usually the same as the user id of the bot.
      </div>
      <form
        className="flex flex-col text-xl md:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          query.refetch();
        }}
      >
        <input
          type="text"
          className="mb-3 flex-grow rounded-md bg-dark-4 px-3 py-2 placeholder-gray-500 md:mb-0 md:mr-3"
          placeholder="416358583220043796"
          value={appId}
          onChange={handleInput}
        />
        <button
          className="flex-initial rounded-md bg-green-500 px-3 py-2 hover:bg-green-600"
          type="submit"
        >
          Lookup
        </button>
      </form>

      {query.error ? (
        <div className="mt-3 text-red-400">{query.error.message}</div>
      ) : query.isFetching ? (
        <ReactLoading
          type="bars"
          color="#dbdbdb"
          height={128}
          width={100}
          className="my-8 mx-auto"
        />
      ) : query.data ? (
        <div className="my-10">
          <div className="mb-8 flex justify-center">
            <div className="mr-4 flex-shrink-0">
              <img
                src={applicationIcon(query.data, { size: 128 })}
                alt=""
                className="h-20 w-20 rounded-full bg-dark-4"
              />
            </div>
            <div className="max-w-lg">
              <div className="text-2xl">{query.data.name}</div>
              <div className="text-gray-400">
                {query.data.description || "No description"}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:justify-items-center">
            <div>
              <div className="mb-1 text-xl font-bold">Bot Info</div>
              <div className="flex text-lg">
                <div
                  className={`mr-2 ${
                    query.data.bot_public ? "text-green-400" : "text-red-400"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={query.data.bot_public ? faCheckCircle : faTimesCircle}
                  />
                </div>
                <div className="text-gray-300">Public Bot</div>
              </div>
              <div className="flex text-lg">
                <div
                  className={`mr-2 ${
                    query.data.bot_require_code_grant
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={
                      query.data.bot_require_code_grant
                        ? faCheckCircle
                        : faTimesCircle
                    }
                  />
                </div>
                <div className="text-gray-300">Requires Code Grant</div>
              </div>
              <div className="flex text-lg">
                <div
                  className={`mr-2 ${
                    hasBitFlag(query.data.flags, 12)
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={
                      hasBitFlag(query.data.flags, 12)
                        ? faCheckCircle
                        : faTimesCircle
                    }
                  />
                </div>
                <div className="text-gray-300">Presence Intent</div>
              </div>
              <div className="flex text-lg">
                <div
                  className={`mr-2 ${
                    hasBitFlag(query.data.flags, 14)
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={
                      hasBitFlag(query.data.flags, 14)
                        ? faCheckCircle
                        : faTimesCircle
                    }
                  />
                </div>
                <div className="text-gray-300">Server Members Intent</div>
              </div>
              <div className="flex text-lg">
                <div
                  className={`mr-2 ${
                    hasBitFlag(query.data.flags, 18)
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={
                      hasBitFlag(query.data.flags, 18)
                        ? faCheckCircle
                        : faTimesCircle
                    }
                  />
                </div>
                <div className="text-gray-300">Message Content Intent</div>
              </div>
            </div>
            <div>
              <div className="mb-1 text-xl font-bold">Policies</div>
              <div className="text-lg">
                {query.data.terms_of_service_url ? (
                  <div>
                    <a
                      href={query.data.terms_of_service_url}
                      target="_blank"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Terms of Service
                    </a>
                  </div>
                ) : (
                  ""
                )}
                {query.data.privacy_policy_url ? (
                  <div>
                    <a
                      href={query.data.privacy_policy_url}
                      target="_blank"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Privacy Policy
                    </a>
                  </div>
                ) : (
                  ""
                )}
                {!query.data.terms_of_service_url &&
                !query.data.privacy_policy_url ? (
                  <div>-</div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
