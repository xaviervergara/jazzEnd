import { Router } from 'express';

import { studentModel } from '../models/students.model.js';

const studentsRoutes = Router();

//POST
studentsRoutes.post('/', async (req, res) => {
  const newStudent = req.body;
  try {
    await studentModel.create(newStudent);
    res.status(201).json({ message: 'ok' });
  } catch (error) {
    res.status(400).send(error);
  }
});

//GET
studentsRoutes.get('/', async (req, res) => {
  try {
    const students = await studentModel.find(); //.populate('courses.course'); //course.course porque asi es la estructura de ese campo en students
    res.send({ students });
  } catch (error) {
    res.status(400).send(error);
  }
});

//POST (AGREGA CURSO AL ESTUDIANTE)
// (studentId, courseId)
studentsRoutes.post('/:sId/:cId', async (req, res) => {
  const { sId, cId } = req.params;

  try {
    //traemos el usuario de la Bd
    const student = await studentModel.findOne({ _id: sId });

    //Pusheamos el curso
    //es "course": cId, porque es con ese nombre que esta definido en el modelo
    student.courses.push({ course: cId });

    //Guardamos ese cambio en la Bd
    await studentModel.updateOne({ _id: sId }, student);

    res.status(201).json({ message: 'Se agregó el curso al estudiante' });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default studentsRoutes;
