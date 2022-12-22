import { router } from "../trpc";
import { accountRouter } from "./account";
import { authRouter } from "./auth";
import { lookupRouter } from "./lookup";
import { statsRouter } from "./stats";
import { statusRouter } from "./status";

export const appRouter = router({
  auth: authRouter,

  lookup: lookupRouter,
  status: statusRouter,
  account: accountRouter,
  stats: statsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
