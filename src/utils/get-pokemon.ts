import { prisma } from "src/server/utils/prisma";
import { AsyncReturnType } from "src/utils/ts-bs";

export type GetPokemonsOrderByVoteType = AsyncReturnType<
  typeof getPokemonsOrderByVote
>;

export const getPokemonsOrderByVote = async () => {
  const pokemons = await prisma.pokemon.findMany({
    orderBy: { votedFor: { _count: "desc" } },
    select: {
      id: true,
      name: true,
      spriteUrl: true,
      _count: {
        select: {
          votedFor: true,
          votedAgainst: true,
        },
      },
    },
  });
  return pokemons;
};
