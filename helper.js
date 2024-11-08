export const succes = (message, data) => {
  return { message, data };
};

export const getUniqueId = (pokemons) => {
  const pokemonId = pokemons.map((pokemon) => pokemon.id);
  const maxId = pokemonId.reduce((a, b) => Math.max(a, b));
  const uniqueId = maxId + 1;
  return uniqueId;
};
