import { Router } from 'express';
import { courseModel } from '../models/courses.model.js';

const coursesRoutes = Router();

coursesRoutes.post('/', async (req, res) => {
  const courses = req.body;

  try {
    await courseModel.create(courses);
    res.status(201).json({ message: 'ok' });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default coursesRoutes;
