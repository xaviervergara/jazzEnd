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

// CONEXION BASE DE DATOS

mongoose.connect(
  'mongodb+srv://xaviervergara00:7bRoXT2dCAi6BNFR@cluster0.tzckbmu.mongodb.net/e-commerce'
);

// montaje enrutador products
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

//////HANDLEBARS CONFIG//////
//vamos a setear un motor 'handlebars' y el motor va a ser handlebars.engine()
//(motor instanciado)
app.engine('handlebars', handlebars.engine());

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
