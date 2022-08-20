import { useState } from "react";
import Pokemon from "src/components/pokemon";
import { getIndexForVote } from "src/utils/random_pokemon";
import { trpc } from "src/utils/trpc";

const Index = () => {
  const [ids, updateIds] = useState(getIndexForVote());
  const [first, second] = ids;

  const { data: firstPoke, isLoading: isFirstPokeLoading } = trpc.useQuery([
    "get-pokemon-by-id",
    { id: first },
  ]);
  const { data: secondPoke, isLoading: isSecondPokeLoading } = trpc.useQuery([
    "get-pokemon-by-id",
    { id: second },
  ]);

  const handleVote = (id: number) => {
    updateIds(getIndexForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl sm:text-3xl font-bold sm:font-black">
        Which Pokémon is Rounder?
      </div>
      <div className="p-2" />
      <div className="border-2 rounded px-8 pb-8 pt-2 flex justify-between items-center">
        <Pokemon pokemon={firstPoke} />
        <div className="p-8 text-3xl font-semibold italic">vs</div>
        <Pokemon pokemon={secondPoke} />
      </div>
    </div>
  );
};

export default Index;
