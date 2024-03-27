import { Router } from 'express';

const petsRoutes = Router();

let pets = [];

petsRoutes.param('name', async (req, res, next, name) => {
  const pet = pets.find((p) => p.name.toLowerCase() === name.toLowerCase());
  if (!pet) {
    return res.status(404).send({ message: 'Pet not found' });
  }
  req.pet = pet; // si se encuentra la mascota la guardamos en el req
  next();
});

//POST
petsRoutes.post('/', (req, res) => {
  const { name, specie } = req.body;
  pets.push({ name, specie });
  res.status(201).send({ message: 'Pet created' });
});

//POST
petsRoutes.get('/:name([A-Za-z]+)', (req, res) => {
  res.send(req.pet);
});

//PUT
petsRoutes.put('/:name([A-Za-z]+)', (req, res) => {
  const { name } = req.params;

  pets = pets.map((pet) =>
    pet.name.toLowerCase() === name.toLowerCase()
      ? { ...pet, adopted: true }
      : pet
  );

  res.send({ message: 'Pet adopted' });
});

export default petsRoutes;
