import { useState, useEffect, useMemo } from "react";
import ReactLoading from "react-loading";
import { guildIcon, userAvatar, formatDateTime } from "../../utils/discord";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { APIGuild, APIUser } from "discord-api-types/v10";

export default function ResolveInvite() {
  const [invite, setInvite] = useState("");
  const inviteCode = useMemo(() => invite, [invite]);

  const router = useRouter();

  const query = trpc.lookup.getInvite.useQuery(inviteCode, {
    enabled: false,
  });

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.invite && !invite) {
      setInvite(router.query.invite.toString());
      query.refetch();
    }
  }, [router]);

  const guild = query.data?.guild as unknown as APIGuild;
  const inviter = query.data?.inviter as unknown as APIUser | undefined;

  function guildDescription() {
    const g = query.data?.guild as any;
    if (!g) return null;

    if (g.description) {
      return g.description;
    }

    if (g.welcome_screen && g.welcome_screen.description) {
      return g.welcome_screen.description;
    }

    return null;
  }

  return (
    <div className="rounded-md bg-dark-3 p-5">
      <div className="mb-5 text-lg text-gray-300">
        Please enter a valid Discord Invite below to resolve it. Discord invites
        usually start with <span className="text-yellow-300">discord.gg/</span>.
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
          placeholder="discord.gg/5GmAsPs"
          value={invite}
          onChange={(e) => setInvite(e.target.value.trim())}
        />
        <button
          className="flex-initial rounded-md bg-green-500 px-3 py-2 hover:bg-green-600"
          type="submit"
        >
          Resolve
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
        <div className="mt-10">
          <div className="mb-16 flex justify-center">
            <div className="flex max-w-xl items-center">
              <img
                src={guildIcon(guild, { size: 128 })}
                alt=""
                className="mr-5 h-32 w-32 rounded-full bg-dark-4"
              />
              <div className="overflow-hidden">
                <div className="text-3xl">{guild.name}</div>
                <div className="mb-1 truncate text-gray-500">{guild.id}</div>
                <div className="text-gray-400">{guildDescription()}</div>
              </div>
            </div>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:justify-items-center">
            <div>
              <div className="mb-2 text-xl font-bold">Vanity Code</div>
              <div className="text-xl text-gray-300">
                {guild.vanity_url_code ?? "-"}
              </div>
            </div>
            <div>
              <div className="mb-2 text-xl font-bold">Members</div>
              <div className="text-xl">
                <span>{query.data.approximate_presence_count}</span>
                <span className="text-gray-500"> / </span>
                <span>{query.data.approximate_member_count} </span>
                <span className="text-gray-400">online</span>
              </div>
            </div>
            <div>
              <div className="mb-2 text-xl font-bold">Invite Expires At</div>
              <div className="text-xl text-gray-300">
                {query.data.expires_at
                  ? formatDateTime(new Date(query.data.expires_at))
                  : "-"}
              </div>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap justify-center">
            {guild.features.map((feature: string) => (
              <div
                key={feature}
                className="mr-2 mb-2 rounded-md bg-dark-5 px-2"
              >
                {feature}
              </div>
            ))}
          </div>

          {inviter ? (
            <div className="flex justify-center">
              <div className="flex items-center rounded-full bg-dark-4 py-2 pl-3 pr-8">
                <img
                  src={userAvatar(inviter, { size: 128 })}
                  alt=""
                  className="mr-5 h-20 w-20 rounded-full bg-dark-5"
                />
                <div>
                  <div className="text-xl">
                    <span>{inviter.username}</span>
                    <span className="text-gray-400">#</span>
                    <span className="text-gray-400">
                      {inviter.discriminator}
                    </span>
                  </div>
                  <div className="text-gray-500">{inviter.id}</div>
                </div>
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
