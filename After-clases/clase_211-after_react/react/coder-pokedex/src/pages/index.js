import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCardContainer from '@/components/PokemonCardContainer';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [pokemons, setPokemons] = useState([]);

  const getPokemons = async () => {
    const { data: pokemonData, status } = await axios.get(
      'http://localhost:8080/api/pokemon/all'
    );

    setPokemons(pokemonData);
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <>
      <h1>Listado de Pokemons</h1>
     
      <PokemonCardContainer pokemons={pokemons} />
    </>
  );
}
