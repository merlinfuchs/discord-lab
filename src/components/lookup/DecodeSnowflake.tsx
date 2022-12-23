import { useState } from "react";
import { formatDateTime, snowlfakeTimestamp } from "../../utils/discord";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "../../utils/trpc";

export default function DecodeSnowflake() {
  const [snowflake, setSnowflake] = useState("");

  const router = useRouter();

  const query = trpc.lookup.getSnowflake.useQuery(snowflake, {
    enabled: false,
  });

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.id && !snowflake) {
      setSnowflake(router.query.id.toString());
      query.refetch();
    }
  }, [router]);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSnowflake(e.target.value.replace(/\D/g, "").trim());
  }

  return (
    <div className="rounded-md bg-dark-3 p-5">
      <div className="mb-5 text-lg text-gray-300">
        Please enter a valid Snowflake (Discord ID) below to decode it. If you
        aren't sure how to obtain a Discord ID please follow the instructions{" "}
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
          query.refetch();
        }}
      >
        <input
          type="text"
          className="mb-3 flex-grow rounded-md bg-dark-4 px-3 py-2 placeholder-gray-500 md:mb-0 md:mr-3"
          placeholder="410488579140354049"
          value={snowflake}
          onChange={handleInput}
        />
        <button
          className="flex-initial rounded-md bg-green-500 px-3 py-2 hover:bg-green-600"
          type="submit"
        >
          Decode
        </button>
      </form>

      {query.error ? (
        <div className="mt-3 text-red-400">{query.error.message}</div>
      ) : query.data ? (
        <div className="mt-12 mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:justify-items-center">
          <div>
            <div className="mb-2 text-xl font-bold">Created At</div>
            <div className="text-xl text-gray-300">
              {formatDateTime(query.data.timestamp)}
            </div>
          </div>
          <div>
            <div className="mb-2 text-xl font-bold">UNIX Timestamp</div>
            <div className="text-xl text-gray-300">
              {query.data.timestamp.getTime() / 1000}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
