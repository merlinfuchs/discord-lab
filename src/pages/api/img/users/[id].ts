import { createCanvas, loadImage } from "canvas";
import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../../../../server/trpc/router/lookup";
import {
  hasBitFlag,
  intToHexColor,
  snowflakeRegex,
  userAvatar,
  userBanner,
} from "../../../../utils/discord";

import path from "path";

const discordBadges: { [key: number]: [string, number] } = {
  0: ["staff.svg", 1],
  1: ["partnered_server_owner.svg", 1],
  2: ["hypesquad_events.svg", 1],
  3: ["bug_hunter_level_1.svg", 1],
  6: ["hypesquad_bravery.svg", 1],
  7: ["hypesquad_brilliance.svg", 1],
  8: ["hypesquad_balance.svg", 1],
  9: ["early_supporter.svg", 1.3],
  14: ["bug_hunter_level_2.svg", 1],
  17: ["early_verified_developer.svg", 1],
  18: ["certified_moderator.svg", 1],
};

export default async function UserBannerAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.id!.toString();

  if (!snowflakeRegex.exec(userId)) {
    return res.status(404).json({});
  }

  const user = await getUser(userId);
  if (!user) {
    return res.status(404).json({});
  }

  const canvas = createCanvas(1200, 650);
  const context = canvas.getContext("2d");

  context.fillStyle = "#1E1E23";
  context.fillRect(0, 0, 1200, 650);

  context.fillStyle = "#101013";
  if (user.accent_color) {
    context.fillStyle = intToHexColor(user.accent_color);
  }
  context.fillRect(0, 0, 1200, 400);

  const bannerUrl = userBanner(user);
  if (bannerUrl) {
    const banner = await loadImage(bannerUrl);
    context.drawImage(banner, 0, 0, 1200, 400);
  }

  // context.strokeStyle = '#1E1E23'
  context.strokeStyle = "#1E1E23";
  context.lineWidth = 30;
  context.beginPath();
  context.arc(250, 350, 150, 0, 2 * Math.PI);
  context.stroke();
  context.fill();

  context.save();
  context.clip();

  const avatar = await loadImage(userAvatar(user, {}));
  context.drawImage(avatar, 100, 200, 300, 300);

  context.restore();

  context.fillStyle = "#fff";
  context.font = "bold 50px Arial";
  context.fillText(user.username, 100, 575);

  const offset = context.measureText(user.username);
  context.fillStyle = "#bbb";
  context.fillText(`#${user.discriminator}`, 102 + offset.width, 575);

  let i = 0;
  for (const [bit, badge] of Object.entries(discordBadges)) {
    if (hasBitFlag(user.public_flags, parseInt(bit))) {
      const image = await loadImage(
        path.resolve(`./public/badges/${badge[0]}`)
      );
      const size = 50 * badge[1];
      context.drawImage(image, 450 + i * 70, 425, size, 50);
      i++;
    }
  }

  const buffer = canvas.toBuffer("image/png");

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Content-Length", buffer.length);
  res.send(buffer);
}
