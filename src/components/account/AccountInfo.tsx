import {
  formatDateTime,
  hasBitFlag,
  intToHexColor,
  snowlfakeTimestamp,
  userAvatar,
  userBanner,
} from "../../utils/discord";
import Tooltip from "../Tooltip";
import { badges } from "../lookup/UserLookup";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { trpc } from "../../utils/trpc";
import ReactLoading from "react-loading";

export default function AccountInfo() {
  const { data: user } = trpc.account.getUser.useQuery();

  if (!user) {
    return (
      <ReactLoading type="bars" color="#dbdbdb" height={128} width={100} />
    );
  }

  return (
    <div className="rounded-md bg-dark-4 pb-10">
      <div
        className="mt-5 h-32 rounded-t-md bg-yellow-400 md:h-48 lg:h-64"
        style={{
          backgroundColor: user.accent_color
            ? intToHexColor(user.accent_color)
            : "#2f3136",
          backgroundImage: `url("${userBanner(user)}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="items-top mb-4 flex px-5">
        <div className="-mt-14 mr-4 flex-shrink-0 rounded-full bg-dark-4 p-2 md:-mt-20">
          <img
            src={userAvatar(user, { size: 128 })}
            alt="avatar"
            className="h-24 w-24 rounded-full md:h-32 md:w-32"
          />
        </div>
        <div className="flex flex-wrap pt-4">
          {Object.entries(badges).map(([bit, value]) =>
            hasBitFlag(user.flags as number, parseInt(bit)) ? (
              <Tooltip title={value[0]!} key={bit}>
                <img
                  src={`/badges/${value[1]}`}
                  alt={value[0]}
                  className="mr-2 mb-2 h-6 w-6"
                />
              </Tooltip>
            ) : (
              ""
            )
          )}
          {user.premium_type === 2 ? (
            <Tooltip title="Nitro">
              <img
                src={`/badges/nitro.svg`}
                alt="Nitro"
                className="mr-2 mb-2 h-6 w-6"
              />
            </Tooltip>
          ) : user.premium_type === 1 ? (
            <Tooltip title="Nitro Classic">
              <img
                src={`/badges/nitro.svg`}
                alt="Nitro Classic"
                className="mr-2 mb-2 h-6 w-6"
              />
            </Tooltip>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="mb-6 px-5 text-2xl font-bold">
        <span>{user.username}</span>
        <span className="text-gray-400">#{user.discriminator}</span>
      </div>

      <div className="grid grid-cols-1 gap-8 px-5 md:grid-cols-3">
        <div>
          <div className="mb-2 text-xl font-bold">Created At</div>
          <div className="text-xl text-gray-300">
            {formatDateTime(snowlfakeTimestamp(user.id) || new Date())}
          </div>
        </div>
        <div>
          <div className="mb-2 text-xl font-bold">Locale</div>
          <div className="text-xl text-gray-300">{user.locale ?? "-"}</div>
        </div>
        <div>
          <div className="mb-2 text-xl font-bold">MFA Enabled</div>
          <div
            className={`text-xl ${
              user.mfa_enabled ? "text-green-400" : "text-red-400"
            }`}
          >
            <FontAwesomeIcon
              icon={user.mfa_enabled ? faCheckCircle : faTimesCircle}
              className="h-5 w-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
