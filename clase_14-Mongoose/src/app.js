import express from 'express';
import usersRoutes from './router/users.routes.js';

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
mongoose.connect(
  'mongodb+srv://xaviervergara00:7bRoXT2dCAi6BNFR@cluster0.tzckbmu.mongodb.net/clase_14'
);

//montaje enrutador en api/users
app.use('/api/users', usersRoutes);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
