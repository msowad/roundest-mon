import NextImage from "next/image";
import { inferQueryResponse } from "src/pages/api/trpc/[trpc]";
import Spinner from "./spinner";

interface Props {
  pokemon?: inferQueryResponse<"get-pokemon-by-id">;
  onVote: () => void;
  onRetry: () => void;
  isLoading: boolean;
  isError: boolean;
}

const Pokemon: React.FC<Props> = ({
  pokemon,
  onVote,
  isLoading,
  isError,
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {!isError && !isLoading && pokemon?.spriteUrl && pokemon?.name && (
        <>
          <NextImage src={pokemon.spriteUrl} width={128} height={128} />
          <h1 className="text-xl font-semibold capitalize mt-[-.5rem]">
            {pokemon.name}
          </h1>
          <div className="p-2" />
          <button type="button" className={btn} onClick={onVote}>
            rounder
          </button>
        </>
      )}
      {isLoading && (
        <div className="w-32 h-[11.5rem] mt-5 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {isError && !isLoading && (
        <div className="w-32 h-[11.5rem] mt-5 flex items-center justify-center">
          <button type="button" className={btn} onClick={onRetry}>
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            retry
          </button>
        </div>
      )}
    </div>
  );
};

const btn =
  "uppercase inline-flex items-center px-5 py-2.5 text-sm font-semibold text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300";

export default Pokemon;
