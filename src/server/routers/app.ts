import * as trpc from "@trpc/server";
import { z } from "zod";
import { MainClient } from "pokenode-ts";
import { resolve } from "path";
import { prisma } from "src/server/utils/prisma";

export const appRouter = trpc
  .router()
  .query("get-pokemon-by-id", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      const api = new MainClient();
      const pokemon = await api.pokemon.getPokemonById(input.id);
      return { name: pokemon.name, sprite: pokemon.sprites.front_default };
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
