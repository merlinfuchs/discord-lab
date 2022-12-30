import { guildIcon, hasBitFlag } from "../../utils/discord";
import Tooltip from "../Tooltip";
import { useState } from "react";
import CustomSelect from "../CustomSelect";
import { trpc } from "../../utils/trpc";
import { GuildFeature } from "discord-api-types/v10";
import ReactLoading from "react-loading";
import { CheckIcon, UserIcon } from "@heroicons/react/24/solid";

interface SelectFilters {
  label: string;
  value: string;
}

export default function AccountServers() {
  const { data: guilds } = trpc.account.getGuilds.useQuery();

  const availableFilters = [
    {
      label: "Servers you own",
      value: "owned",
    },
    {
      label: "Servers you moderate",
      value: "moderated",
    },
    {
      label: "Verified Servers",
      value: "verified",
    },
    {
      label: "Partnered Servers",
      value: "partnered",
    },
    {
      label: "Community Servers",
      value: "community",
    },
  ];
  const [filters, setFilters] = useState<SelectFilters[]>([]);

  if (!guilds) {
    return (
      <ReactLoading type="bars" color="#dbdbdb" height={128} width={100} />
    );
  }

  let filteredGuilds = guilds;

  for (const filter of filters) {
    switch (filter.value) {
      case "owned":
        filteredGuilds = filteredGuilds.filter((g) => g.owner);
        break;
      case "moderated":
        filteredGuilds = filteredGuilds.filter(
          (g) => g.permissions && hasBitFlag(parseInt(g.permissions), 5)
        );
        break;
      case "partnered":
        filteredGuilds = filteredGuilds.filter((g) =>
          g.features.includes(GuildFeature.Partnered)
        );
        break;
      case "verified":
        filteredGuilds = filteredGuilds.filter((g) =>
          g.features.includes(GuildFeature.Verified)
        );
        break;
      case "community":
        filteredGuilds = filteredGuilds.filter((g) =>
          g.features.includes(GuildFeature.Community)
        );
        break;
    }
  }

  filteredGuilds = filteredGuilds.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <div className="mb-3 flex flex-col md:flex-row">
        <CustomSelect
          options={availableFilters}
          isMulti={true}
          onChange={(filters: SelectFilters[]) => setFilters(filters)}
          value={filters}
          placeholder="Filter ..."
          className="mb-3 flex-auto md:mr-3 md:mb-0"
        />
        <div className="flex items-center justify-center rounded-md bg-dark-4 px-3 py-2 text-lg">
          <span className="mr-1">{filteredGuilds.length}</span>
          <span className="text-gray-300">Results</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {filteredGuilds.map((guild) => (
          <a
            key={guild.id}
            href={`/lookup/guild?guild_id=${guild.id}`}
            target="_blank"
            rel="noreferrer"
            className="block flex transform items-center rounded-md bg-dark-3 p-3 pr-5 transition-transform hover:scale-101"
          >
            <div className="mr-3 flex-shrink-0">
              <img
                src={guildIcon(guild, { size: 128 })}
                alt="icon"
                className="h-16 w-16 rounded-full"
              />
            </div>
            <div className="flex-auto overflow-hidden">
              <div className="truncate text-xl">{guild.name}</div>
              <div className="text-sm text-gray-400">{guild.id}</div>
            </div>
            <div className="flex flex-shrink-0 items-center space-x-3">
              {guild.owner ? (
                <Tooltip title="Owner">
                  <UserIcon className="h-6 w-6 text-yellow-400" />
                </Tooltip>
              ) : (
                ""
              )}
              {!guild.owner &&
              guild.permissions &&
              hasBitFlag(parseInt(guild.permissions), 5) ? (
                <Tooltip title="Moderator">
                  <img
                    src={`/badges/staff.svg`}
                    alt="Moderator"
                    className="h-6 w-6"
                  />
                </Tooltip>
              ) : (
                ""
              )}
              {guild.features.includes(GuildFeature.Partnered) ? (
                <Tooltip title="Partnered">
                  <img
                    src={`/badges/partnered_server_owner.svg`}
                    alt="Partnered"
                    className="h-6 w-6"
                  />
                </Tooltip>
              ) : (
                ""
              )}
              {guild.features.includes(GuildFeature.Verified) ? (
                <Tooltip title="Verified">
                  <CheckIcon className="h-6 w-6 text-green-400" />
                </Tooltip>
              ) : (
                ""
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
