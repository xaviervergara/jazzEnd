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
//El .json en vez de .send es mas espeficico. Solo acepta jsons, el send acepta cualquier cosa

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

//PUT

usersRoutes.put('/:userId', async (req, res) => {
  //obtenemos id
  const { userId } = req.params;
  //obtenemos los datos a actualizar
  const updatedUser = req.body;
  try {
    // primer parametro es el id del obj a actualizar, y el segundo la actualizacion
    await userModel.updateOne({ _id: userId }, updatedUser);
    //poner un status 200 es redundante, porque solo basta con ver el resultado
    //positivo de la request y ya sabemos que salio bien.
    res.status(200).json({ message: 'User updated' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Could not update user' });
  }
});

//DELETE

usersRoutes.delete('/:userId', async (req, res) => {
  //obtenemos id
  const { userId } = req.params;
  try {
    const deleted = await userModel.deleteOne({ _id: userId });
    // el resultado de deleteOne indica el número de documentos que
    // coincidieron con los criterios de la consulta y fueron eliminados.
    // deletedCount será igual a 1 si se encuentra un documento con el ID especificado
    // y se elimina correctamente. Si no se encuentra ningún documento que coincida con
    // el criterio, deletedCount será 0.

    if (!deleted.deletedCount) {
      return res.status(400).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Could not delete user' });
  }
});

export default usersRoutes;
