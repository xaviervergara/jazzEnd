import express from 'express';
import usersRoutes from './router/users.routes.js';
import estudiantesRoutes from './router/estudiantes.routes.js';

//Importamos mongoose
import mongoose from 'mongoose';

const app = express();

//recibir datos complejos x url
app.use(express.urlencoded({ extended: true }));
//Recibir json a traves de body
app.use(express.json());
//carpeta estatica
app.use(express.static('public'));

//Esta linea va antes del montaje de las rutas!
//La ultima ruta es el nombre de la base de datos con la que queremos trabajar.
//En este caso la cambiamos a "colegio", que es la del ejercicio, anteriormente usabamos "clase_14"
mongoose.connect(
  'mongodb+srv://xaviervergara00:7bRoXT2dCAi6BNFR@cluster0.tzckbmu.mongodb.net/colegio'
);

//montaje enrutador en api/users
app.use('/api/users', usersRoutes);
//montaje enrutador en api/estudiantes
app.use('/api/estudiantes', estudiantesRoutes);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
