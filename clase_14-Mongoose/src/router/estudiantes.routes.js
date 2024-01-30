import { Router } from 'express';
import { estudianteModel } from '../models/estudiante.model.js';

const estudiantesRoutes = Router();

//GET

estudiantesRoutes.get('/', async (req, res) => {
  try {
    const estudiantes = await estudianteModel.find();

    res.status(200).json({ estudiantes });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Could not find any estudiantes' });
  }
});

//POST

estudiantesRoutes.post('/', async (req, res) => {
  try {
    //no desestructuramos, no validamos. Ya se valida con el required del model
    const newStudent = req.body;
    await estudianteModel.create(newStudent);
    res.status(200).json({ message: 'Usuario creado!' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Could not add estudiante' });
  }
});

//PUT

estudiantesRoutes.put('/:studentId', async (req, res) => {
  try {
    const updatedStudent = req.body;
    const { studentId } = req.params;

    const update = await estudianteModel.updateOne(
      { _id: studentId },
      updatedStudent
    );
    //valida si se hizo la actualizacion o no: ej, caso que hayan puesto una key inexistente,
    //no se actualiza pero si da el mensaje de que se actualizo. Para evitar esto, con la propiedad
    //modifiedCount, que cada vez que se actualiza se incrementa, podemos verificar si se actualizo o no
    //y dar una respuesta
    if (!update.modifiedCount) {
      res.status(400).json({ message: 'Could not update user' });
    }
    res.status(200).json({ message: 'Estudiante actualizado!' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Could not update estudiante' });
  }
});

//DELETE

estudiantesRoutes.delete('/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const deleted = await estudianteModel.deleteOne({ _id: studentId });
    if (!deleted.deletedCount) {
      return res.status(400).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Usuario eliminado!' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Could not delete estudiante' });
  }
});

export default estudiantesRoutes;
