import express from 'express';
import usersRoutes from './router/users.routes.js'; //No olvidar el .js
import mongoose from 'mongoose';

const app = express();

//recibimos json de body
app.use(express.json());
//datos complejos de url (query params)
app.use(express.urlencoded({ extended: true }));
//carpeta estatica
app.use(express.static('public'));

//Router
//montaje de las rutas (no olvidar la primer barra '/'api)
app.use('/api/users', usersRoutes);

//CONEXION BASE DE DATOS
mongoose.connect(
  'mongodb+srv://xaviervergara00:7bRoXT2dCAi6BNFR@cluster0.tzckbmu.mongodb.net/clase_15'
);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
