import express from 'express';
import petsRoutes from './routes/pet.routes.js';
import UserRouter from './routes/users.routes.js';
import SessionRouter from './routes/session.routes.js';

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = new UserRouter();
const sessionRouter = new SessionRouter();

//     //////////////
//    ////ROUTER////
//   //////////////

app.use('/api/pets', petsRoutes);

app.use('/api/users', userRoutes.getRouter());

app.use('/api/session', sessionRouter.getRouter());

app.listen(PORT, console.log(`Server running on port ${PORT}`));
