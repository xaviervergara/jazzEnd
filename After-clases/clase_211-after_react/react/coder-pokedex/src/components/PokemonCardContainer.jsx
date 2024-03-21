import React from 'react';
import PokemonCard from './PokemonCard';
import { Box, Grid } from '@mui/material';

const PokemonCardContainer = ({ pokemons }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        {pokemons.map(({ frontImg, name, pokemonId }) => (
          <Grid item>
            <PokemonCard
              imgUrl={frontImg}
              name={name}
              number={pokemonId}
              key={pokemonId}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default PokemonCardContainer;
