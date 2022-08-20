import NextImage from "next/image";

interface Props {
  pokemon?: { name: string; sprite: string | null };
}

const Pokemon: React.FC<Props> = ({ pokemon }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {pokemon?.sprite && pokemon?.name ? (
        <>
          <NextImage src={pokemon.sprite} width={128} height={128} />
          <h1 className="text-xl font-semibold capitalize mt-[-.5rem]">
            {pokemon.name}
          </h1>
        </>
      ) : (
        <div className="w-32 h-32 mt-5 flex items-center justify-center">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Pokemon;
