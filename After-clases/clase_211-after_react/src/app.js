import express from 'express';
import mongoose from 'mongoose';
import pokemonRoutes from './routes/pokemon.routes.js';
import cors from 'cors';
const PORT = 8080;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  'mongodb+srv://xaviervergara00:7bRoXT2dCAi6BNFR@cluster0.tzckbmu.mongodb.net/coder'
);

app.use('/api/pokemon', pokemonRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
