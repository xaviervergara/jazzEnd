import { Router } from 'express';

//Importamos nuestro modelo
import { userModel } from '../models/user.model.js';

const usersRoutes = Router();

//GET
usersRoutes.get('/', async (req, res) => {
  try {
    const users = await userModel.find();
    //podemos poner .send tambien en vez de json
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'users not found' });
  }
});

//POST
usersRoutes.post('/', async (req, res) => {
  const { first_name, last_name, email } = req.body;

  if (!first_name || !last_name || !email) {
    return res.status(400).send({ message: 'user incomplete' });
  }

  try {
    //podriamos poner ...create(req.body), pero de esa manera habilitamos a que el usuario
    //ponga datos que no queremos. Especificando las variables nos aseguramos de obtener solo los
    //campos que nosotros deseamos y que estan definidos en nuestro esquema
    await userModel.create({ first_name, last_name, email });
    res.status(200).send({ message: 'User added' });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'Could not create az user' });
  }
});

export default usersRoutes;
