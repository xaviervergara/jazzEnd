//importamos express
import express from 'express';
//Traemos las rutas de users RECORDAR EL .JS AL FINAL
import userRoutes from './routes/user.routes.js';
//Traemos las rutas de pets RECORDAR EL .JS AL FINAL
import petsRouter from './routes/pets.routes.js';

//iniciamos aplicacion
const app = express();

//Configuracion de puerto
const PORT = 8080;

//MIDDLEWARES
//Configuracion para interpretar json de req.body
app.use(express.json());

//Configuracion para recibir cualquier tipo de datos por url
app.use(express.urlencoded({ extended: true }));

//La carpeta public ahora es un recurso estatico!
//Ej: si tenemos el archivo "cat.jpg" en "public" la ruta para acceder
//es directamente "http://localhost:8080/cat.jpg"
//Si no queremos que los recursos estaticos se sirvan en el directorio de raiz,
//simplemente agregamos un primer argumento (ruta) antes de "express.static":
//La ruta en este caso seria "http://localhost:8080/static/cat.jpg"
// app.use('/static', express.static('public')); Lo comento para que no pise el de abajo
app.use(express.static('public'));

//MIDDLEWARE A NIVEL APLICACION, LOGUEA FECHA CADA VEZ QUE SE UTILICE CUALQUIERA DE LAS RUTAS DE LA APP
app.use((req, res, next) => {
  const date = new Date();
  console.log(`Fecha ${date.toISOString()}`);
  next();
});

//La ruta de 'userROuter' la definimos desde app.js, esa SERA SU RUTA RAIZ
//En primer lugar se coloca la ruta raiz, y al lado el lugar donde queremos que vaya esa ruta.
//en este caso, va a ir a userRoutes
// app.use('/api/users', userRoutes);
app.use(
  '/api/users',
  (req, res, next) => {
    console.log('Estoy utilizando la ruta USERS');
    next();
  },
  userRoutes
);

//Lo mismo pero con pets
app.use('/api/pets', petsRouter);

//Servidor escuchando en puerto 8080
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
