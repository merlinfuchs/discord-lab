import {useUser} from "../../hooks/user";
import PleaseLogin from "../PleaseLogin";
import {formatDateTime, hasBitFlag, intToHexColor, snowlfakeTimestamp, userAvatar, userBanner} from "../../util";
import Tooltip from "../Tooltip";
import {badges} from "../lookup/UserLookup";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function AccountInfo() {
    const user = useUser()

    if (!user) {
        return <PleaseLogin/>
    }

    return (
        <div className="bg-dark-4 rounded-md pb-10">
            <div className="bg-yellow-400 h-32 md:h-48 lg:h-64 rounded-t-md mt-5" style={{
                backgroundColor: intToHexColor(user.accent_color),
                backgroundImage: `url("${userBanner(user)}")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}/>
            <div className="flex items-top px-5 mb-4">
                <div className="-mt-14 md:-mt-20 p-2 bg-dark-4 rounded-full mr-4 flex-shrink-0">
                    <img src={userAvatar(user, {size: 128})} alt="avatar"
                         className="rounded-full w-24 h-24 md:w-32 md:h-32"/>
                </div>
                <div className="flex flex-wrap pt-4">
                    {Object.keys(badges).map(bit => hasBitFlag(user.flags, bit) ? (
                        <Tooltip title={badges[bit][0]} key={bit}>
                            <img src={`/discord-badges/${badges[bit][1]}`} alt={badges[bit][0]}
                                 className="w-6 h-6 mr-2 mb-2"/>
                        </Tooltip>
                    ) : '')}
                    {user.premium_type === 2 ? (
                        <Tooltip title="Nitro">
                            <img src={`/discord-badges/nitro.svg`} alt="Nitro"
                                 className="w-6 h-6 mr-2 mb-2"/>
                        </Tooltip>
                    ) : user.premium_type === 1 ? (
                        <Tooltip title="Nitro Classic">
                            <img src={`/discord-badges/nitro.svg`} alt="Nitro Classic"
                                 className="w-6 h-6 mr-2 mb-2"/>
                        </Tooltip>
                    ) : ''}
                </div>
            </div>
            <div className="px-5 text-2xl font-bold mb-6">
                <span>{user.username}</span>
                <span className="text-gray-400">#{user.discriminator}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 px-5 gap-8">
                <div>
                    <div className="text-xl font-bold mb-2">Created At</div>
                    <div className="text-xl text-gray-300">{formatDateTime(snowlfakeTimestamp(user.id))}</div>
                </div>
                <div>
                    <div className="text-xl font-bold mb-2">Locale</div>
                    <div className="text-xl text-gray-300">{user.locale ?? '-'}</div>
                </div>
                <div>
                    <div className="text-xl font-bold mb-2">MFA Enabled</div>
                    <div className={`text-xl ${user.mfa_enabled ? 'text-green-400' : 'text-red-400'}`}>
                        <FontAwesomeIcon
                                            icon={user.mfa_enabled ? faCheckCircle : faTimesCircle}/>
                    </div>
                </div>
            </div>
        </div>
    )
}