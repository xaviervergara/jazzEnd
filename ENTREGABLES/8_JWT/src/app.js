console.log('directorio desde app.js', process.cwd());
// importamos express
import express from 'express';

// Importamos handlebars
import handlebars from 'express-handlebars';

// Importamos socket.io
import { Server } from 'socket.io';

// Importamos mongoose
import mongoose from 'mongoose';

// Importamos productsRouter
import productsRouter from './routes/products.routes.js';

// Importamos cartsRouter
import cartsRouter from './routes/carts.routes.js';

// Importamos viewsRouter
import viewsRouter from './routes/views.routes.js';

// importamos ProductManager (MongoDB)
import ProductManager from './DAO/MongoDb/ProductManager.js';

// Importamos el esquema de mensajes (chatApp)

import { messageModel } from './DAO/models/messages.models.js';

// Importamos la clase mongoStore del modulo connect-mongo

import MongoStore from 'connect-mongo';

// Importamos session

import session from 'express-session';

// importamos las rutas de sesion

import sessionRoutes from './routes/session.routes.js';

// importamos passport

import passport from 'passport';

// importamos funcion para inicializar passport

import initializePassport from './config/passport.config.js';

// Instanciamos ProductManager
const productManager = new ProductManager('../../productos.json');

// Escuchando en puerto 8080
const PORT = 8080;

// Iniciamos la app
const app = express();

// recibimos json
app.use(express.json());

// configuracion url
app.use(express.urlencoded({ extended: true }));

// config carpeta publica
app.use(express.static('public'));

//SESSION con MongoDb (Configuramos la session)
//Acá la coneccion con la bd es exclusivamente para las sessions, mas abajo podemos ver como nos conectamos de nuevo en el marco de mongoose

app.use(
  session({
    secret: 'C0d3rh0us3',
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://xaviervergara00:7bRoXT2dCAi6BNFR@cluster0.tzckbmu.mongodb.net/e-commerce', // /coder => es la bd donde se va a guardar la coleccion sessions
      ttl: 300, //(900=15min)
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

// CONEXION BASE DE DATOS

mongoose.connect(
  'mongodb+srv://xaviervergara00:7bRoXT2dCAi6BNFR@cluster0.tzckbmu.mongodb.net/e-commerce'
);

// montaje enrutador products
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);
app.use('/api/sessions', sessionRoutes);

//////HANDLEBARS CONFIG//////
const hbs = handlebars.create({
  //Crea un nuevo handlebars engine con la opcion "runtimeOptions" que permite envio de propiedades como prototipos
  runtimeOptions: {
    allowProtoPropertiesByDefault: true, // Permite pasar props que se consideran prototipos (mongoose tiene estas propiedades que son consideradas como tales. De esta manera nos aseguramos de que handlebars las interprete como tal y las deje pasar)
  },
});

//(motor instanciado)
app.engine('handlebars', hbs.engine);

//indicamos donde esta la ruta de las vistas
app.set('views', 'src/views');

//indicamos que vamos a utilizar el motor handlebars para las vistas
app.set('view engine', 'handlebars');

///////FIN HANDLEBARS///////

// Server corriendo desde 8080
// app.listen(PORT, () => console.log(`Server running on ${PORT}`));

////////SOCKET.IO CONFIG////////
const httpServer = app.listen(PORT, () =>
  console.log(`Server running on ${PORT}`)
);

// instanciamos un nuevo servidor web socket de la clase Server que importamos de socket.io
const io = new Server(httpServer);

const messages = [];

io.on('connection', (socket) => {
  console.log(`A new client has connected`);

  // AGREGAR PRODUCTO
  socket.on('addProduct', async (data) => {
    await productManager.addProduct(data);
    const products = await productManager.getProducts();

    io.emit('updatedProducts', products.payload); //ojo con esto, trabajando con paginate, recibimos distinto el obj y hay que ir a docs
  });

  // ELIMINAR PRODUCTO
  socket.on('deleteValue', async (data) => {
    if (!data) {
      return console.error('Socket error: Debe ingresar un Id');
    }
    await productManager.deleteProduct(data);
    const products = await productManager.getProducts();
    io.emit('updatedProducts', products.payload);
  });
  /////////////////CHAT APP//////////////////
  socket.on('message', async (data) => {
    await messageModel.create({ user: data.user, message: data.data });
    messages.push(data);

    io.emit('messageLogs', messages);
  });

  socket.on('newUser', (user) => {
    io.emit('userLog', user);
    socket.broadcast.emit('notification', user);
  });
});
