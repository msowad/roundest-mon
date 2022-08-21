import { PrismaClient } from "@prisma/client";
import { MainClient } from "pokenode-ts";

const prisma = new PrismaClient({
  log: ["query"],
});

const storePokemon = async () => {
  const pokemonApi = new MainClient();

  const allPokemons = await pokemonApi.pokemon.listPokemons(0, 493);
  const formattedPokemons = allPokemons.results.map((p, index) => ({
    name: p.name,
    spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`,
  }));

  await prisma.pokemon.deleteMany();
  const pokemons = await prisma.pokemon.createMany({ data: formattedPokemons });
  console.log("Create Pokemons Count", pokemons.count);
};

storePokemon();
