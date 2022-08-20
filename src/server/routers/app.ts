import * as trpc from "@trpc/server";
import { z } from "zod";
import { MainClient } from "pokenode-ts";

export const appRouter = trpc.router().query("get-pokemon-by-id", {
  input: z.object({
    id: z.number(),
  }),
  async resolve({ input }) {
    const api = new MainClient();
    const pokemon = await api.pokemon.getPokemonById(input.id);
    return pokemon;
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;
