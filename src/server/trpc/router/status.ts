import { router, publicProcedure } from "../trpc";

const stagingStatus = {
  open: false,
  lastOpen: new Date("2021-03-04").toISOString(),
  updatedAt: 0,
};

async function updateStagingStatus() {
  if (stagingStatus.updatedAt > Date.now() - 1000 * 60 * 5) return;

  try {
    const resp = await fetch("https://staging.discord.co", {
      redirect: "manual",
    });
    stagingStatus.open = resp.status >= 200 && resp.status < 300;
    stagingStatus.updatedAt = Date.now();
  } catch {}
}

export const statusRouter = router({
  getStaging: publicProcedure.query(async () => {
    await updateStagingStatus();

    return {
      open: stagingStatus.open,
      lastOpen: stagingStatus.lastOpen,
    };
  }),
  getRTC: publicProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
