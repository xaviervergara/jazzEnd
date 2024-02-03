import { Router } from 'express';
import { userModel } from '../models/users.model.js';

const viewsRoutes = Router();

viewsRoutes.get('/', async (req, res) => {
  try {
    const users = await userModel.find().lean();

    res.render('index', {
      title: '|| Clase integradora',
      style: 'index.css',
      users,
    });
  } catch (error) {
    console.error(error);
  }
});

viewsRoutes.get('/add-user', (req, res) => {
  res.render('add-user', {
    title: '|| Clase integradora',
    style: 'add-user.css',
  });
});
export default viewsRoutes;
