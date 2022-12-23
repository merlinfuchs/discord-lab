import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import Tooltip from "../Tooltip";
import {
  hasBitFlag,
  intToHexColor,
  userAvatar,
  userBanner,
  formatDateTime,
  snowlfakeTimestamp,
} from "../../utils/discord";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

export const badges = {
  0: ["Discord Employee", "staff.svg"],
  1: ["Partnered Server Owner", "partnered_server_owner.svg"],
  2: ["HypeSquad Events", "hypesquad_events.svg"],
  3: ["Bug Hunter", "bug_hunter_level_1.svg"],
  6: ["HypeSquad Bravery", "hapesquad_bravery.svg"],
  7: ["HypeSquad Brilliance", "hypesquad_brilliance.svg"],
  8: ["HypeSquad Balance", "hypesquad_balance.svg"],
  9: ["Early Supporter", "early_supporter.svg"],
  14: ["Bug Hunter", "bug_hunter_level_2.svg"],
  17: ["Early Verified Bot Developer", "early_verified_developer.svg"],
  18: ["Discord Certified Moderator", "certified_moderator.svg"],
  22: ["Active Developer", "active_developer.svg"],
};

export default function UserLookup() {
  const [userId, setUserId] = useState("");

  const router = useRouter();

  const query = trpc.lookup.getUser.useQuery(userId, {
    enabled: false,
  });

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.user_id && !userId) {
      setUserId(router.query.user_id.toString());
      query.refetch();
    }
  }, [router]);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setUserId(e.target.value.replace(/\D/g, "").trim());
  }

  function handleSubmit() {
    if (!userId) return;
    query.refetch();
  }

  return (
    <div className="rounded-md bg-dark-3 p-5">
      <div className="mb-5 text-lg text-gray-300">
        Please enter a valid Discord user ID below to look it up. If you aren't
        sure how to obtain a Discord user ID please follow the instructions{" "}
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
          placeholder="386861188891279362"
          value={userId}
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
        <div className="rounded-md bg-dark-4 pb-10">
          <div
            className="mt-5 h-32 rounded-t-md bg-yellow-400 md:h-48 lg:h-64"
            style={{
              backgroundColor: intToHexColor(query.data.accent_color || 0),
              backgroundImage: `url("${userBanner(query.data)}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="items-top mb-4 flex px-5">
            <div className="-mt-14 mr-4 flex-shrink-0 rounded-full bg-dark-4 p-2 md:-mt-20">
              <img
                src={userAvatar(query.data, { size: 128 })}
                alt="avatar"
                className="h-24 w-24 rounded-full md:h-32 md:w-32"
              />
            </div>
            <div className="flex flex-wrap pt-4">
              {Object.entries(badges).map(([bit, value]) =>
                hasBitFlag(query.data!.public_flags, parseInt(bit)) ? (
                  <Tooltip title={value[0]} key={bit}>
                    <img
                      src={`/badges/${value[1]}`}
                      alt={value[0]}
                      className="mr-2 mb-2 h-8 w-8"
                    />
                  </Tooltip>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
          <div className="mb-6 px-5 text-2xl font-bold">
            <span>{query.data.username}</span>
            <span className="text-gray-400">#{query.data.discriminator}</span>
          </div>

          <div className="grid grid-cols-1 gap-8 px-5 md:grid-cols-3">
            <div>
              <div className="mb-2 text-xl font-bold">Created At</div>
              <div className="text-xl text-gray-300">
                {formatDateTime(
                  snowlfakeTimestamp(query.data.id) || new Date()
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
