import type { Prisma } from "@prisma/client";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { GetEntriesSchema, InsertEntrySchema } from "~/utils/types";

export const entryRouter = createTRPCRouter({
  insert: publicProcedure
    .input(InsertEntrySchema)
    .mutation(({ ctx: { prisma }, input: data }) =>
      prisma.entry.create({
        data: {
          ...data,
          duration: data.duration ? parseInt(data.duration) : null,
        },
      })
    ),

  get: publicProcedure
    .input(GetEntriesSchema)
    .query(({ ctx: { prisma }, input }) => {
      const where: Prisma.EntryWhereInput = {};

      if (input.Kind) where.kind = input.Kind;

      if (input.dateRange) {
        where.createdAt = {
          gte: new Date(input.dateRange.start),
          lte: new Date(input.dateRange.end),
        };
      }

      return prisma.entry.findMany({ where });
    }),
});
