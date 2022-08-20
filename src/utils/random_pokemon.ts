const MAX_DEX_ID = 493;

export const getRandomPokemon: (except?: number) => number = (except) => {
  const pokemonIndex = Math.floor(Math.random() * MAX_DEX_ID) + 1;
  if (pokemonIndex !== except) return pokemonIndex;
  return getRandomPokemon(except);
};

export const getIndexForVote = () => {
  const firstIndex = getRandomPokemon();
  const secondIndex = getRandomPokemon(firstIndex);
  return [firstIndex, secondIndex];
};
