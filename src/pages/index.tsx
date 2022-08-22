import NextLink from "next/link";
import { useState } from "react";
import Pokemon from "src/components/pokemon";
import { getIndexForVote } from "src/utils/random_pokemon";
import { trpc } from "src/utils/trpc";

const Index = () => {
  const [ids, updateIds] = useState(getIndexForVote());
  const [first, second] = ids;

  const {
    data: firstPoke,
    isLoading: isFirstPokeLoading,
    isError: isFirstPokeError,
  } = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const {
    data: secondPoke,
    isLoading: isSecondPokeLoading,
    isError: isSecondPokeError,
  } = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  const voteMutation = trpc.useMutation(["cast-vote"]);

  const handleVote = async (id: number) => {
    voteMutation.mutate({
      votedFor: id,
      votedAgainst: id === first ? second : first,
    });

    updateIds(getIndexForVote());
  };

  const handleRetry = () => {
    updateIds(getIndexForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl sm:text-3xl font-bold sm:font-black">
        Which Pokémon is Rounder?
      </div>
      <div className="p-2" />
      <div className="border-2 rounded px-8 pb-8 pt-2 flex justify-between items-center">
        <Pokemon
          pokemon={firstPoke}
          onVote={() => handleVote(first)}
          isLoading={isFirstPokeLoading}
          isError={isFirstPokeError}
          onRetry={handleRetry}
        />
        <div className="px-8 mt-5 text-3xl font-semibold italic">vs</div>
        <Pokemon
          pokemon={secondPoke}
          onVote={() => handleVote(second)}
          isLoading={isSecondPokeLoading}
          isError={isSecondPokeError}
          onRetry={handleRetry}
        />
      </div>
      <div className="p-2" />
      <div className="">
        <NextLink href="/results">
          <a className="underline hover:text-white text-gray-400">
            View Results
          </a>
        </NextLink>
      </div>
    </div>
  );
};

export default Index;
