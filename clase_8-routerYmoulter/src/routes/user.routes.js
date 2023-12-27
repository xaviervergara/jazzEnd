//Se importa el objeto Router, desestructurandolo del modulo express
import { Router } from 'express';

//Se crea una instancia del objeto Router
const userRoutes = Router();

const users = [];

//ya se pueden hacer las peticiones:
//Esta ruta raiz, apunta a la ruta que creamos en app (/api/users),
//por defecto (/) apunta a la ruta que creamos desde app.js
//GET
userRoutes.get('/', (req, res) => {
  res.send({ users });
});

//POST

userRoutes.post('/', (req, res) => {
  const user = req.body;
  users.push(user);
  res.send({ message: `Usuario agregado exitosamente!` });
});

//EJEMPLO PUT
//En el caso de los PUT siempre se utiliza un id identificador, precisamente,
//para saber cual es el item a modificar. En este caso, si miramos la ruta,
//observamos que hemos utilizado directamente el param. Esto significa, teniendo
//en cuenta la ruta raiz que esta en 'app.js', que la ruta queda: '/api/users/:userId'
userRoutes.put('/:userId', (req, res) => {});

//exportamos este modulo o mini aplicacion, para llevarla a 'app.js'
export default userRoutes;
