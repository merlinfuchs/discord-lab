import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import Tooltip from "../Tooltip";
import { guildIcon } from "../../utils/discord";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

export default function GuildLookup() {
  const [guildId, setGuildId] = useState("");

  const query = trpc.lookup.getGuild.useQuery(guildId, {
    enabled: false,
  });

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.guild_id && !guildId) {
      setGuildId(router.query.guild_id.toString());
      query.refetch();
    }
  }, [router]);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setGuildId(e.target.value.replace(/\D/g, "").trim());
  }

  function handleSubmit() {
    if (!guildId) return;
    query.refetch();
  }

  return (
    <div className="rounded-md bg-dark-3 p-5">
      <div className="mb-5 text-lg text-gray-300">
        Please enter a valid Discord server ID below to look it up. If you
        aren't sure how to obtain a Discord server ID please follow the
        instructions{" "}
        <a
          href="/docs"
          target="_blank"
          className="text-blue-400 hover:text-blue-300"
        >
          here
        </a>
        .
      </div>
      <form
        className="flex flex-col text-xl md:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className="mb-3 flex-grow rounded-md bg-dark-4 px-3 py-2 placeholder-gray-500 md:mb-0 md:mr-3"
          placeholder="410488579140354049"
          value={guildId}
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
        <div className="my-8 flex flex-col items-center">
          <ReactLoading type="bars" color="#dbdbdb" height={128} width={100} />
          <div className="text-xl text-gray-300">Fetching information ...</div>
        </div>
      ) : query.data ? (
        <div>
          <div className="my-12 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 sm:justify-items-center">
            <div className="flex items-center">
              {query.data.icon ? (
                <img
                  src={guildIcon(query.data, {})}
                  alt="icon"
                  className="mr-4 h-20 w-20 rounded-full"
                />
              ) : (
                ""
              )}
              <div>
                <div className="mb-2 text-xl text-gray-400">Server Name</div>
                <div className="text-xl">{query.data.name}</div>
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <div className="mb-2 text-xl text-gray-400">Members</div>
                <div className="text-xl">
                  <span>
                    {query.data.presence_count ||
                      query.data.approximate_presence_count}
                  </span>
                  <span className="text-gray-400"> / </span>
                  <span>{query.data.approximate_member_count} </span>
                  <span className="text-gray-400">online</span>
                </div>
              </div>
            </div>
          </div>
          {query.data.description ? (
            <div className="flex justify-center">
              <div className="mb-10 max-w-lg text-center">
                <div className="mb-2 text-2xl font-bold">Description</div>
                <div className="text-xl text-gray-400">
                  {query.data.description}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {query.data.members ? (
            <div>
              <div className="mb-5 text-center text-2xl font-bold">Members</div>
              <div className="mb-8 flex flex-wrap justify-center">
                {query.data.members.map((member: any) => (
                  <div key={member.id} className="relative mr-3 mb-3">
                    <Tooltip title={member.username}>
                      <img
                        src={member.avatar_url}
                        alt="avatar"
                        className="h-12 w-12 rounded-full"
                      />
                    </Tooltip>
                    <div className="absolute right-0 bottom-0 rounded-full bg-dark-3 p-0.5">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          member.status === "dnd"
                            ? "bg-red-500"
                            : member.status === "idle"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
          {query.data.emojis ? (
            <div>
              <div className="mb-5 text-center text-2xl font-bold">Emojis</div>
              <div className="mb-8 flex flex-wrap justify-center">
                {query.data.emojis.map((emoji: any) => (
                  <div key={emoji.id} className="relative mr-3 mb-3">
                    <Tooltip title={emoji.name}>
                      <img
                        src={`https://cdn.discordapp.com/emojis/${emoji.id}.webp`}
                        alt="emoji"
                        className="h-6 w-6"
                      />
                    </Tooltip>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
          {query.data.features ? (
            <div>
              <div className="mb-5 text-center text-2xl font-bold">
                Features
              </div>
              <div className="mb-8 flex flex-wrap justify-center">
                {query.data.features.map((feature) => (
                  <div
                    key={feature}
                    className="mr-2 mb-2 rounded-md bg-dark-5 px-2"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
          {query.data.instant_invite ? (
            <div>
              <div className="mb-2 flex flex-col justify-center text-lg sm:flex-row">
                <input
                  type="text"
                  className="mb-2 flex-auto rounded-r-md rounded-l-md bg-dark-4 px-3 py-2 sm:mb-0 sm:rounded-r-none"
                  value={query.data.instant_invite}
                  onChange={() => {}}
                />
                <a
                  className="block rounded-l-md rounded-r-md bg-blue-400 px-4 py-2 hover:bg-blue-500 sm:rounded-l-none"
                  href={query.data.instant_invite}
                  target="_blank"
                >
                  Join Server
                </a>
              </div>
              <div>
                <span className="text-yellow-300">Protip: </span>
                <span className="text-gray-400">
                  You can use this invite in the Invite Resolver to get more
                  information about the server!
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
