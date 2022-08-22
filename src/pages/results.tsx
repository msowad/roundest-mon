import { GetServerSideProps, NextPage } from "next";
import NextImage from "next/image";
import NextLink from "next/link";
import React from "react";
import {
  getPokemonsOrderByVote,
  GetPokemonsOrderByVoteType,
} from "src/utils/get-pokemon";

interface Props {
  pokemons: GetPokemonsOrderByVoteType;
}

const Results: NextPage<Props> = ({ pokemons }) => {
  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <TableHeader />
      <div className="py-4" />
      <PokeTable pokemons={pokemons} />
    </div>
  );
};

const PokeTable: React.FC<{ pokemons: GetPokemonsOrderByVoteType }> = ({
  pokemons,
}) => {
  const generateVoteCountPercent = (
    pokemon: GetPokemonsOrderByVoteType[number]
  ) => {
    const { votedFor, votedAgainst } = pokemon._count;
    const totalVote = votedFor + votedAgainst;
    if (totalVote == 0) return 0;
    return (votedFor / totalVote) * 100;
  };
  return (
    <div className="overflow-x-auto relative shadow-md rounded-lg">
      <table className="w-full text-sm text-left">
        <tbody>
          {pokemons.map((p) => (
            <tr key={p.id} className="border-b bg-gray-800 border-gray-700">
              <th
                scope="row"
                className="px-6 font-medium whitespace-nowrap flex items-center"
              >
                <NextImage src={p.spriteUrl} width={64} height={64} />
                <h1 className="capitalize ml-6 font-semibold">{p.name}</h1>
              </th>
              <th
                scope="row"
                className="px-6 capitalize font-medium whitespace-nowrap"
              >
                {generateVoteCountPercent(p)}%
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableHeader = () => {
  return (
    <div className="flex justify-between items-center pb-4">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <NextLink href="/">
              <a className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </a>
            </NextLink>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-1 text-sm font-medium md:ml-2 text-gray-400">
                Results
              </span>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const pokemons = await getPokemonsOrderByVote();

  return {
    props: { pokemons },
  };
};

export default Results;
