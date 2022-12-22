import { trpc } from "../../utils/trpc";
import ReactLoading from "react-loading";

export default function StagingStatus() {
  const { data } = trpc.status.getStaging.useQuery();

  if (!data) {
    return (
      <ReactLoading
        type="bars"
        color="#dbdbdb"
        height={128}
        width={100}
        className="my-8 mx-auto"
      />
    );
  }

  function closedDays() {
    if (!data) return 0;

    const oneDay = 24 * 60 * 60 * 1000;
    const lastOpen = new Date(data.lastOpen);
    return Math.round(Math.abs((Date.now() - lastOpen.getTime()) / oneDay));
  }

  return (
    <div className="flex items-center rounded-md bg-dark-3 p-4">
      <div className="mr-5">
        <img
          src={
            data.open
              ? "https://cdn.discordapp.com/emojis/758426141764616242.gif"
              : "https://cdn.discordapp.com/emojis/775398227562201139.png"
          }
          alt=""
          className="rounded-full bg-dark-4"
        />
      </div>
      {data.open ? (
        <div>
          <div className="mb-1 text-3xl text-green-400">Staging is open!!!</div>
          <div className="text-lg text-gray-300">
            Is this a dream or has the holy Jake finally heard our prayers?
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-1 text-3xl text-red-400">Staging is closed</div>
          <div className="text-lg text-gray-300">
            Day {closedDays()} of waiting for Jake to re-open staging for us
          </div>
        </div>
      )}
    </div>
  );
}
