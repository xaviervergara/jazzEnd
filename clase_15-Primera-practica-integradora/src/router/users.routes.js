import { Router } from 'express';
import { userModel } from '../models/users.model.js';
import { uploader } from '../utils/multer.js';

const usersRoutes = Router();

//GET
usersRoutes.get('/', async (req, res) => {
  //extraemos las queries (propiedades de los usuarios)
  //http://localhost:8080/api/users?gender=M

  const { gender } = req.query;
  try {
    let users = [];
    if (gender) {
      //Filtramos busqueda por genero, si hay querie se filtra, sino, no
      users = await userModel.find({ gender: gender });
    } else {
      users = await userModel.find();
    }

    res.send({ users });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Could not find user' });
  }
});

//GET POR ID
usersRoutes.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'Could not find user' });
  }
});

//POST

usersRoutes.post('/', uploader.single('file'), async (req, res) => {
  const user = req.body;
  const path = req.file.path.split('public').join('');
  try {
    await userModel.create({ ...user, imagePath: path });
    res.status(201).json({ message: 'User added' });
  } catch (error) {
    console.error(error);
    //mandamos al cliente mas detalle del error porque en console.error, sale en la consola del backend nomas
    //mongoose agrega la propiedad "errors" al objeto error, para dar informacion sobre las validaciones
    //Pero si tenemos un caso en el que un usuario se agrega 2 veces, donde sale el error del documento unico
    //Lo tenemos que captar con "error" ya que este no aparece en error.errors, de esta manera nos aseguramos
    //de siempre capturar cualquier error
    if (error.errors) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(400).json({ error });
  }
});

//PUT
//PENDIENTE REVISAR CASO DONDE ACTUALIZAN CON EL MISMO VALOR, MANDAR ERROR ESPECIFICO, FIJARSE DE DONDE SE PUEDE EXTRAER ESA INFORMACION
usersRoutes.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const updatedUser = req.body;

  try {
    const update = await userModel.updateOne({ _id: userId }, updatedUser);
    //si no esta modificando
    if (!update.modifiedCount) {
      return res.status(400).json({ message: 'Could not update user' });
    }
    res.status(201).json({ message: 'User updated' });
  } catch (error) {
    console.error(error);
    if (error.errors) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(400).json({ error });
  }
});

// DELETE

usersRoutes.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const deleted = await userModel.deleteOne({ _id: userId });
    if (!deleted.deletedCount) {
      return res.status(404).json({ message: 'Could not delete user' });
    }
    res.status(201).json({ message: 'User deleted' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Could not delete user' });
  }
});
export default usersRoutes;
