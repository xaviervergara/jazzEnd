//libreria para hacer solicitudes get, post, delete...a apis
//es la mas comun, fetch no funciona en backend, por eso se utiliza axios
const axios = require('axios');
const fs = require('fs');

const llamarPokemon = async (pokemonId) => {
  try {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );
    await fs.promises.writeFile(
      './pokemons.json',
      JSON.stringify(data),
      'utf-8'
    );
    console.log(`El pokemon nº ${data.id} es: ${data.name}`);
  } catch (error) {
    console.log(`Error de solicitud: ${error}`);
  }
};
llamarPokemon(89);
