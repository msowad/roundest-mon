import { prisma } from "src/server/utils/prisma";
import { AsyncReturnType } from "src/utils/ts-bs";

export type GetPokemonsOrderByVoteType = AsyncReturnType<
  typeof getPokemonsOrderByVotePercent
>;

export const getPokemonsOrderByVotePercent = async () => {
  const pokemons = await prisma.pokemon.findMany({
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
  const sortedPokemons = pokemons.sort(
    (a, b) => generateVoteCountPercent(b) - generateVoteCountPercent(a)
  );
  return sortedPokemons;
};

export const generateVoteCountPercent = (
  pokemon: GetPokemonsOrderByVoteType[number]
) => {
  const { votedFor, votedAgainst } = pokemon._count;
  const totalVote = votedFor + votedAgainst;
  if (totalVote == 0) return 0;
  return (votedFor / totalVote) * 100;
};
