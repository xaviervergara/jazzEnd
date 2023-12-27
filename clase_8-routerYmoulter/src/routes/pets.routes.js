//Se importa el objeto Router, desestructurandolo del modulo express
import { Router } from 'express';
//Se crea una instancia del objeto Router
const petsRouter = Router();

let pets = [];

//GET
petsRouter.get('/', (req, res) => {
  res.send({ pets });
});

//PUT
petsRouter.post('/', (req, res) => {
  const pet = req.body;
  pets.push({ pet });

  res.send({ message: `Mascota agregada exitosamente!` });
});

//DELETE
petsRouter.delete('/', (req, res) => {
  pets = [];
  res.send({ message: 'Mascotas eliminadas' });
});
export default petsRouter;
