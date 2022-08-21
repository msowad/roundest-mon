import * as trpc from "@trpc/server";
import { prisma } from "src/server/utils/prisma";
import { z } from "zod";

export const appRouter = trpc
  .router()
  .query("get-pokemon-by-id", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      const pokemon = await prisma.pokemon.findFirst({
        where: { id: input.id },
      });
      return pokemon;
    },
  })
  .mutation("cast-vote", {
    input: z.object({
      votedFor: z.number(),
      votedAgainst: z.number(),
    }),
    async resolve({ input }) {
      const vote = await prisma.vote.create({
        data: input,
      });

      return { success: true, vote };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
