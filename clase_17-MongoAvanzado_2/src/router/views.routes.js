import { Router } from 'express';
import { userModel } from '../models/users.model.js';

const viewsRoutes = Router();

viewsRoutes.get('/', (req, res) => {
  res.render('index', {});
});

///
// http://localhost:8080/students?page=2 aqui podemos cambiar la page desde el query de la url
viewsRoutes.get('/students', async (req, res) => {
  const { page } = req.query;
  const data = await userModel.paginate({}, { limit: 20, page: page });
  //le agregamos a data las props 'prev y next link' las cuales contienen los links dinamicos
  data.prevLink = `/students?page=${page - 1}`; //Solo se pone esta porcion del link. recordemos que estamos usando routes, con lo que obviamos el https://localh...
  data.nextLink = `/students?page=${+page + 1}`;
  res.render('students', { title: `Page ${data.page}`, data });
});
export default viewsRoutes;
