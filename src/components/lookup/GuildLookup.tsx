import {useState, useRef, useEffect} from 'react'
import ReactLoading from "react-loading";
import Tooltip from "../Tooltip";
import {apiRequest, guildIcon, solveCaptcha} from "../../util";
import {useRouter} from "next/router";


export default function GuildLookup() {
    const [guildId, setGuildId] = useState('')

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [widgetData, setWidgetData] = useState(null)
    const [previewData, setPreviewData] = useState(null)

    const router = useRouter()

    useEffect(() => {
        if (!router.isReady) return
        if (router.query.guild_id && !guildId) {
            setGuildId(router.query.guild_id)
            lookupGuild(router.query.guild_id)
        }
    }, [router])

    function lookupGuild(newGuildId) {
        setError(null)
        setLoading('captcha')

        solveCaptcha().then(captchaSolution => {
            setLoading('loading')

            fetch(`https://discord.com/api/v9/guilds/${newGuildId}/widget.json`)
                .then(async resp => {
                    let exists = false
                    let widget = false

                    if (!resp.ok) {
                        if (resp.status === 403) {
                            exists = true
                        }
                    } else {
                        exists = true
                        widget = true
                        setWidgetData(await resp.json())
                    }

                    if (exists) {
                        apiRequest(
                            `/lookup/guilds/${newGuildId}`,
                            {captcha: captchaSolution}
                        )
                            .then(async resp => {
                                if (!resp.ok) {
                                    setError('Failed to lookup this server, please try again later.')
                                } else {
                                    const data = await resp.json()
                                    if (data.exists) {
                                        setPreviewData(data.data)
                                    } else if (!widget) {
                                        setError('The server exists but we can\'t find information about it.')
                                    }
                                    setLoading(null)
                                }
                            })
                    } else {
                        setLoading(null)
                        setError('The server doesn\'t seem to exist.')
                    }
                })
        })
    }

    function handleInput(e) {
        setGuildId(e.target.value.replace(/\D/g, '').trim())
    }

    function handleSubmit() {
        if (!guildId) return
        lookupGuild(guildId)
    }

    function guildName() {
        return widgetData?.name ?? previewData?.name
    }

    function guildIconUrl() {
        if (previewData) {
            return guildIcon(previewData, {size: 128})
        }
        return null
    }

    function guildDescription() {
        return previewData?.description
    }

    function guildFeatures() {
        return previewData?.features
    }

    function guildPresenceCount() {
        return widgetData?.presence_count ?? previewData?.approximate_presence_count
    }

    function guildMemberCount() {
        return previewData?.approximate_member_count
    }

    function guildMembers() {
        return widgetData?.members
    }

    function guildEmojis() {
        return previewData?.emojis
    }

    function guildInvite() {
        return widgetData?.instant_invite
    }

    return (
        <div className="bg-dark-3 p-5 rounded-md">
            <div className="text-lg text-gray-300 mb-5">Please enter a valid Discord server ID below to look it up. If
                you aren't sure how to obtain a
                Discord server ID please follow the instructions <a href="/docs" target="_blank"
                                                                    className="text-blue-400 hover:text-blue-300">here</a>.
            </div>
            <form className="flex flex-col md:flex-row text-xl" onSubmit={e => {
                e.preventDefault();
                handleSubmit();
            }}>
                <input type="text"
                       className="px-3 py-2 rounded-md bg-dark-4 placeholder-gray-500 flex-grow mb-3 md:mb-0 md:mr-3"
                       placeholder="410488579140354049" value={guildId} onChange={handleInput}/>
                <button className="px-3 py-2 rounded-md bg-green-500 flex-initial hover:bg-green-600"
                        type="submit">Lookup
                </button>
            </form>

            {
                error ? (
                    <div className="mt-3 text-red-400">{error}</div>
                ) : loading === 'loading' ? (
                    <div className="flex flex-col items-center my-8">
                        <ReactLoading type='bars' color="#dbdbdb" height={128} width={100}/>
                        <div className="text-xl text-gray-300">Fetching information ...</div>
                    </div>
                ) : loading === 'captcha' ? (
                    <div className="flex flex-col items-center my-8">
                        <ReactLoading type='bars' color="#dbdbdb" height={128} width={100}/>
                        <div className="text-xl text-gray-300">Making sure you are not a robot ...</div>
                    </div>
                ) : previewData || widgetData ? (
                    <div>
                        <div className="my-12 grid grid-cols-1 sm:grid-cols-2 sm:justify-items-center gap-x-5 gap-y-8">
                            <div className="flex items-center">
                                {guildIconUrl() ? (
                                    <img src={guildIconUrl()} alt="icon" className="rounded-full w-20 h-20 mr-4"/>
                                ) : ''}
                                <div>
                                    <div className="text-gray-400 text-xl mb-2">Server Name</div>
                                    <div className="text-xl">{guildName()}</div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div>
                                    <div className="text-gray-400 text-xl mb-2">Members</div>
                                    <div className="text-xl">
                                        <span>{guildPresenceCount()}</span>
                                        <span className="text-gray-400"> / </span>
                                        <span>{guildMemberCount()} </span>
                                        <span className="text-gray-400">online</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {guildDescription() ? (
                            <div className="flex justify-center">
                                <div className="text-center mb-10 max-w-lg">
                                    <div className="text-2xl font-bold mb-2">Description</div>
                                    <div className="text-xl text-gray-400">{guildDescription()}</div>
                                </div>
                            </div>
                        ) : ''}
                        {guildMembers() ? (
                            <div>
                                <div className="text-center text-2xl font-bold mb-5">Members</div>
                                <div className="flex flex-wrap justify-center mb-8">
                                    {guildMembers().map(member => (
                                        <div key={member.id} className="mr-3 mb-3 relative">
                                            <Tooltip title={member.username}>
                                                <img src={member.avatar_url} alt="avatar"
                                                     className="w-12 h-12 rounded-full"/>
                                            </Tooltip>
                                            <div className="bg-dark-3 rounded-full p-0.5 absolute right-0 bottom-0">
                                                <div
                                                    className={`w-3 h-3 rounded-full ${member.status === 'dnd' ? 'bg-red-500' : member.status === 'idle' ? 'bg-yellow-500' : 'bg-green-500'}`}/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : ''}
                        {guildEmojis() ? (
                            <div>
                                <div className="text-center text-2xl font-bold mb-5">Emojis</div>
                                <div className="flex flex-wrap justify-center mb-8">
                                    {guildEmojis().map(emoji => (
                                        <div key={emoji.id} className="mr-3 mb-3 relative">
                                            <Tooltip title={emoji.name}>
                                                <img src={`https://cdn.discordapp.com/emojis/${emoji.id}.webp`}
                                                     alt="emoji"
                                                     className="w-6 h-6"/>
                                            </Tooltip>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : ''}
                        {guildFeatures() ? (
                            <div>
                                <div className="text-center text-2xl font-bold mb-5">Features</div>
                                <div className="flex flex-wrap justify-center mb-8">
                                    {guildFeatures().map(feature => (
                                        <div key={feature} className="mr-2 mb-2 px-2 bg-dark-5 rounded-md">
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : ''}
                        {guildInvite() ? (
                            <div>
                                <div className="flex flex-col sm:flex-row justify-center text-lg mb-2">
                                    <input type="text"
                                           className="px-3 py-2 rounded-r-md sm:rounded-r-none rounded-l-md bg-dark-4 flex-auto mb-2 sm:mb-0"
                                           value={guildInvite()} onChange={() => {
                                    }}/>
                                    <a className="block px-4 py-2 rounded-l-md sm:rounded-l-none rounded-r-md bg-blue-400 hover:bg-blue-500"
                                       href={guildInvite()} target="_blank">Join Server</a>
                                </div>
                                <div>
                                    <span className="text-yellow-300">Protip: </span>
                                    <span className="text-gray-400">You can use this invite in the Invite Resolver to get more information about the server!</span>
                                </div>
                            </div>
                        ) : ''}
                    </div>
                ) : ''
            }
        </div>
    )
}