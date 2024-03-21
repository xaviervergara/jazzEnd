import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const PokemonDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [{ pokemon }, setPokemon] = useState({});

  const getPokemonById = async () => {
    if (!id) {
      return;
    }
    const { data, status } = await axios.get(
      // axios devuelve data y status asique se puede desestructurar
      `http://localhost:8080/api/pokemon/${id}`
    );
    setPokemon(data);
  };

  useEffect(() => {
    getPokemonById();
  }, [id]);

  return (
    <>
      <h1>Detalle del Pokemon #{id}</h1>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
      >
        <Card sx={{ width: '400px' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={pokemon?.frontImg ?? ''} //si no viene pokemon mandamos string vacio (esto pasa porque tarda un toque en cargar la pag. se puede resolver poniendo un spinner mientras y no pasaria)
              alt={pokemon?.name ?? ''}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                #{pokemon?.pokemonId ?? ''} {pokemon?.name ?? ''}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {pokemon?.types.map((e) => (
                  <Typography>{e.type.name}</Typography>
                ))}
              </Box>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link href={'/'}>
              <Button size="small" color="primary">
                volver
              </Button>
            </Link>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default PokemonDetail;
