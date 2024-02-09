// Importamos express
import express from 'express';

//Importamos el enrutador
import usersRoutes from './router/users.routes.js';

// Importamos mongoose
import mongoose, { Mongoose } from 'mongoose';

// importamos ruta para students
import studentsRoutes from './router/students.routes.js';

// importamos ruta para courses
import coursesRoutes from './router/courses.routes.js';

// Puerto
const PORT = 8080;

// Instanciamos la app
const app = express();

// Antes de la ruta nos conectamos a la BD
mongoose.connect(
  'mongodb+srv://xaviervergara00:7bRoXT2dCAi6BNFR@cluster0.tzckbmu.mongodb.net/coder'
);

// Recibimos json
app.use(express.json());

//Montaje en ruta api/users
app.use('/api/users', usersRoutes);

//Montaje en ruta api/students
app.use('/api/students', studentsRoutes);

//Montaje en ruta api/courses
app.use('/api/courses', coursesRoutes);

//Servidor corriendo en 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
