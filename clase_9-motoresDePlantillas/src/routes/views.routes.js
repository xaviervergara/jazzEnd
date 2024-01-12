import { Router } from 'express';

const viewsRoutes = Router();

import { users } from './users.routes.js';

// renderizamos la vista index
// app.get('/', (req, res) => {
//   const user = {
//     firstName: 'Xavier',
//     lastName: 'Vergara',
//   };
//   res.render('index', user);
// });

//EJERCICIO DATOS PERSONALES

//SACAMOS EL ARREGLO DE USUARIOS Y LO MANDAMOS A USERS.ROUTES PARA QUE ESE ARCHIVO SE ENCARGUE DE USUARIOS
//LUEGO ACA LO IMPORTAMOS PARA QUE SIGA FUNCIONANDO LA PETICION GET DE ABAJO

// const users = [
//   {
//     firstName: 'Xavier',
//     lastName: 'Vergara',
//     age: 30,
//     email: 'asd@gmail.com',
//     phone: 132484121,
//     role: 'admin',
//   },
//   {
//     firstName: 'Juan',
//     lastName: 'Aguirre',
//     age: 21,
//     email: 'juanAAG@gmail.com',
//     phone: 31685121,
//     role: 'admin',
//   },
//   {
//     firstName: 'Damian',
//     lastName: 'Gutierrez',
//     age: 29,
//     email: 'damingutt@gmail.com',
//     phone: 636659879,
//     role: 'user',
//   },
//   {
//     firstName: 'Jesus',
//     lastName: 'Moreira',
//     age: 44,
//     email: 'yisucraist@gmail.com',
//     phone: 647788423,
//     role: 'user',
//   },
//   {
//     firstName: 'Abel',
//     lastName: 'Ramirez',
//     age: 60,
//     email: 'abelleram@gmail.com',
//     phone: 8752322156,
//     role: 'user',
//   },
// ];

const food = [
  { name: 'pollo', price: 7 },
  { name: 'ensalada', price: 5 },
  { name: 'sopa', price: 4 },
  { name: 'pescado', price: 9 },
  { name: 'hamburguesa', price: 5 },
];

viewsRoutes.get('/', (req, res) => {
  //floor, porque accedemos a users a traves de indices. si toca el 5 se convierte en 4 y se obtiene el ultimo elemento
  const num = Math.floor(Math.random() * users.length);
  let user = users[num];
  const isAdmin = user.role === 'admin'; //si ese user random es admin, isAdmin arroja true, y si es user, false
  user = { ...user, isAdmin }; // agregamos la propiedad isAdmin al user// Tambien es valido user.isAdmin = isAdmin
  res.render('index', { user, food, title: 'Usuarios', style: 'index.css' }); //se manda como objeto, y en el index, se hace user.value porque si no no sabe a que objeto pertenece la variable
});

//RENDERIZAMOS LA VISTA "REGISTER" OSEA EL FORMULARIO, Y LOS DATOS QUE SE ENVIAN (POST), SE ENVIAN A LA RUTA API/USERS
//DESDE USERS.ROUTES
viewsRoutes.get('/register', (req, res) => {
  res.render('register');
});

export default viewsRoutes;
