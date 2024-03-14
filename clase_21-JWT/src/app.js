import express from 'express';
import session from 'express-session';
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import sessionRoutes from './routes/session.routes.js';
import viewRoutes from './routes/views.routes.js';
import mongoose from 'mongoose';
import passport from 'passport';
import initializePassport from './config/passport.config.js';

const PORT = 8080;

const filestore = FileStore(session);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//carpeta publica
app.use(express.static('public'));

////////Handlebars config///////
const hbs = handlebars.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
  },
});

app.engine('handlebars', hbs.engine);
app.set('views', 'src/views');
app.set('view engine', 'handlebars');

////////////

//SESSION con MongoDb (Configuramos la session)
//Acá la coneccion con la bd es exclusivamente para las sessions, mas abajo podemos ver como nos conectamos de nuevo en el marco de mongoose
app.use(
  session({
    secret: 'C0d3rh0us3',
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://xaviervergara00:7bRoXT2dCAi6BNFR@cluster0.tzckbmu.mongodb.net/coder', // /coder => es la bd donde se va a guardar la coleccion sessions
      ttl: 30, //estando dentro del tiempo de expiracion, si refrescamos el browser el ttl comienza de nuevo la cuenta. si refrescamos luego de que haya pasado el tiempo de sesion debemos volver a loguearnos
    }),
    resave: true,
    saveUninitialized: true,
  })
);

/////////////
//PASSPORT//
///////////

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//      /////////////////////////
//     //////HANDS ON LAB///////
//    /////////////////////////

///////////
//Routes///
///////////
app.use('/api/sessions', sessionRoutes); //cuando usamos sessions, esta config de routes debe ir debajo de la de sessions
app.use('/', viewRoutes);
//Mongoose-connect

mongoose.connect(
  'mongodb+srv://xaviervergara00:7bRoXT2dCAi6BNFR@cluster0.tzckbmu.mongodb.net/coder'
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
