import { getIndexForVote } from "src/utils/random_pokemon";

const Index = () => {
  const [first, second] = getIndexForVote();

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl sm:text-3xl font-bold sm:font-black">
        Which Pokémon is Rounder?
      </div>
      <div className="p-2" />
      <div className="border-2 rounded p-8 flex justify-between items-center">
        <div className="w-16 h-16 bg-red-800">{first}</div>
        <div className="p-8 text-3xl font-semibold italic">vs</div>
        <div className="w-16 h-16 bg-green-800">{second}</div>
      </div>
    </div>
  );
};

export default Index;
