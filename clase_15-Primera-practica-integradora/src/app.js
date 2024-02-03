import express from 'express';
import usersRoutes from './router/users.routes.js'; //No olvidar el .js
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import viewsRoutes from './router/views.routes.js';

const app = express();

const PORT = 8080;

//recibimos json de body
app.use(express.json());
//datos complejos de url (query params)
app.use(express.urlencoded({ extended: true }));
//carpeta estatica
app.use(express.static('public'));

//////HANDLEBARS//////
//args = como se llama el motor, el motor- (Podemos tener varios motores)
app.engine('handlebars', handlebars.engine());
//seteamos las vistas, decimos donde estan las vistas
app.set('views', 'src/views');
//decimos cual es el motor que vamos a usar (porque podemos tener varios)
app.set('view engine', 'handlebars');
/////////////////////

//Router
//montaje de las rutas (no olvidar la primer barra '/'api)
//ruta para api users
app.use('/api/users', usersRoutes);
//ruta para views
app.use('/', viewsRoutes);

//CONEXION BASE DE DATOS
mongoose.connect(
  'mongodb+srv://xaviervergara00:7bRoXT2dCAi6BNFR@cluster0.tzckbmu.mongodb.net/clase_15'
);

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
