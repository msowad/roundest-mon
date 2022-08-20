import { Pokemon } from "pokenode-ts";
import NextImage from "next/image";

interface Props {
  pokemon?: Pokemon;
}

const Pokemon: React.FC<Props> = ({ pokemon }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {pokemon?.sprites.front_default ? (
        <>
          <NextImage
            src={pokemon.sprites.front_default}
            width={128}
            height={128}
          />
          <h1 className="text-xl font-semibold capitalize mt-[-.5rem]">
            {pokemon?.name}
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
