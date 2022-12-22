import { useState, useEffect } from "react";
import ReactLoading from "react-loading";

export default function VoiceLatency() {
  const [locations, setLocations] = useState<
    {
      region: string;
      ips: string[];
    }[]
  >([]);

  useEffect(() => {
    fetch("https://latency.discord.media/rtc").then(async (resp) => {
      setLocations(await resp.json());
    });
  }, []);

  if (!locations) {
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

  return (
    <div>
      {locations.map((location, i) => (
        <div
          key={i}
          className="mb-3 flex items-center rounded-md bg-dark-3 p-3"
        >
          <div className="mr-3 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-dark-5 text-4xl">
            {i + 1}
          </div>
          <div>
            <div className="mb-1 text-xl capitalize">{location.region}</div>
            <div className="flex flex-wrap">
              {location.ips.map((ip) => (
                <div key={ip} className="mr-1 mb-1 rounded-md bg-dark-4 px-2">
                  {ip}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
