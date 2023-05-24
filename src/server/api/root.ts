import { createTRPCRouter } from "~/server/api/trpc";
import { entryRouter } from "~/server/api/routers/entry";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  entry: entryRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
