// Importamos router
import { Router } from 'express';

// Importamos el modelo de usuario
import { userModel } from '../models/users.model.js';

// Importamos modelo de usuario

const usersRoutes = Router();

usersRoutes.get('/', async (req, res) => {
  try {
    const users = await userModel.find({ first_name: 'Dani' });
    // message: 'Acceso a la base de datos confirmada'
    res.send({ users });
  } catch (error) {
    console.error(error);
  }
});

export default usersRoutes;
