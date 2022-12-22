import {useGuilds} from "../../hooks/guilds";
import PleaseLogin from "../PleaseLogin";
import {guildIcon, hasBitFlag} from "../../util";
import Tooltip from "../Tooltip";
import {useState} from 'react'
import CustomSelect from "../CustomSelect";

export default function AccountServers() {
    const guilds = useGuilds()

    const availableFilters = [
        {
            label: 'Servers you own',
            value: 'owned'
        },
        {
            label: 'Servers you moderate',
            value: 'moderated'
        },
        {
            label: 'Verified Servers',
            value: 'verified'
        },
        {
            label: 'Partnered Servers',
            value: 'partnered'
        },
        {
            label: 'Community Servers',
            value: 'community'
        }
    ]
    const [filters, setFilters] = useState([])

    if (!guilds) {
        return <PleaseLogin/>
    }

    let filteredGuilds = guilds

    for (let filter of filters) {
        switch (filter.value) {
            case 'owned':
                filteredGuilds = filteredGuilds.filter(g => g.owner)
                break;
            case 'moderated':
                filteredGuilds = filteredGuilds.filter(g => hasBitFlag(g.permissions, 5))
                break;
            case 'partnered':
                filteredGuilds = filteredGuilds.filter(g => g.features.includes('PARTNERED'))
                break;
            case 'verified':
                filteredGuilds = filteredGuilds.filter(g => g.features.includes('VERIFIED'))
                break;
            case 'community':
                filteredGuilds = filteredGuilds.filter(g => g.features.includes('COMMUNITY'))
                break;
        }
    }

    filteredGuilds = filteredGuilds
        .sort((a, b) => a.name.localeCompare(b.name))

    return (
        <div>
            <div className="mb-3 flex flex-col md:flex-row">
                <CustomSelect options={availableFilters} isMulti={true} onChange={filters => setFilters(filters)}
                              value={filters} placeholder="Filter ..." className="flex-auto md:mr-3 mb-3 md:mb-0"/>
                <div className="flex items-center justify-center bg-dark-4 rounded-md px-3 py-2 text-lg">
                    <span className="mr-1">{filteredGuilds.length}</span>
                    <span className="text-gray-300">Results</span>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {filteredGuilds.map(guild => (
                    <a key={guild.id} href={`/lookup/guild?guild_id=${guild.id}`} target="_blank"
                       className="block flex bg-dark-3 p-3 pr-5 rounded-md items-center transform hover:scale-101 transition-transform">
                        <div className="flex-shrink-0 mr-3">
                            <img src={guildIcon(guild, {size: 128})} alt="icon" className="rounded-full w-16 h-16"/>
                        </div>
                        <div className="overflow-hidden flex-auto">
                            <div className="text-xl truncate">{guild.name}</div>
                            <div className="text-gray-400 text-sm">{guild.id}</div>
                        </div>
                        <div className="flex-shrink-0 flex items-center space-x-3">
                            {guild.owner ? (
                                <Tooltip title="Owner">
                                    <img src={`/discord-badges/server-owner.svg`} alt="Owner"
                                         className="w-5 h-5"/>
                                </Tooltip>
                            ) : ''}
                            {!guild.owner && hasBitFlag(guild.permissions, 5) ? (
                                <Tooltip title="Moderator">
                                    <img src={`/discord-badges/staff.svg`} alt="Moderator"
                                         className="w-5 h-5"/>
                                </Tooltip>
                            ) : ''}
                            {guild.features.includes('PARTNERED') ? (
                                <Tooltip title="Partnered">
                                    <img src={`/discord-badges/partner-server.svg`} alt="Partnered"
                                         className="w-5 h-5"/>
                                </Tooltip>
                            ) : ''}
                            {guild.features.includes('VERIFIED') ? (
                                <Tooltip title="Verified">
                                    <img src={`/discord-badges/verified-server.svg`} alt="Verified"
                                         className="w-5 h-5"/>
                                </Tooltip>
                            ) : ''}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}