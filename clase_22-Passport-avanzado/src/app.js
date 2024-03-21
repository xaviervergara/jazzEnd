import express from 'express';
import passport from 'passport';
import sessionRoutes from './routes/session.routes.js';
import cookieParser from 'cookie-parser';
import initializePassport from './config/passport.config.js';

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//Inizializar passport
initializePassport();
//Inicializador de passport
app.use(passport.initialize());
//Cookie parser
app.use(cookieParser());
//Router
app.use('/api/session', sessionRoutes);

app.listen(PORT, console.log(`Server running on port ${PORT}`));
