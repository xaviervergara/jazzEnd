import { Router } from 'express';

import { studentModel } from '../models/students.model.js';

const studentsRoutes = Router();

//POST
studentsRoutes.post('/', async (req, res) => {
  const newStudent = req.body;
  try {
    await studentModel.create(newStudent);
    res.status(201).json({ message: ok });
  } catch (error) {
    res.status(400).send(error);
  }
});

//GET
studentsRoutes.get('/', async (req, res) => {
  try {
    const students = await studentModel.find();
    res.send({ students });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default studentsRoutes;
