import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Link from 'next/link';

export default function PokemonCard({ imgUrl, name, number }) {
  return (
    <Link href={`/pokemondetail/${number}`}>
      <Card sx={{ width: 200 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={imgUrl}
            alt={name}
            sx={{ objectFit: 'contain' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              #{number} {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
