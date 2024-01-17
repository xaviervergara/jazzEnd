//importamos express
import express from 'express';

//importamos handlebars
import handlebars from 'express-handlebars';

//Importamos socket.io

import { Server } from 'socket.io';

//puerto 8080
const PORT = 8080;

//iniciamos la app
const app = express();

//importamos rutas
import viewsRoutes from './routes/views.routes.js'; //NO OLVIDARSE DEL .JS!

//montamos el enrutador views
app.use('/', viewsRoutes);

//HANDLEBARS
//////configuracion del motor de plantillas//////
app.engine('handlebars', handlebars.engine());

//seteamos las vistas
app.set('views', 'src/views');

//seteamos cual va a ser el motor de vistas
app.set('view engine', 'handlebars');
//____________________________________________//

//recibir json desde el body
app.use(express.json());
//recibiir de  query params
app.use(express.urlencoded({ extended: true }));

//config carpeta publica
app.use(express.static('public'));

//servidor corriendo en puerto 8080
//SOCKET.IO CONFIG
//Guardamos el metodo en una variable
const httpServer = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

//SOCKET.IO CONFIG
//Por lo general esta variable se llama "io", ahora
//la nombramos asi para entender mas facilmente su funcion
//Instanciamos el objeto httpServer de la clase Server que importamos de socket.io
const socketServer = new Server(httpServer);

const messages = [];
//Esuchar conexion de un nuevo socket
//En el evento "connection" (cuando se conectan al server), recibimos el socket y enviamos mensaje
socketServer.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  //aqui tiene que coincidir el nombre del evento con el el del lado del cliente
  //recibimos la info del cliente
  // socket.on('message', (data) => console.log(data));

  // //Se puede enviar info del server al cliente de 3 maneras:

  // //Sintaxis: 'identificador'(tiene que ser el mismo desde el cliente), 'mensaje'
  //DESCOMENTAR PARA PROBAR//
  // socket.emit('recibe_uno', 'Esta informacion la recibe uno solo');

  // socket.broadcast.emit(
  //   'reciben_todos_menos_uno',
  //   'Reciben todos menos el que solicitó'
  // );

  // socketServer.emit('reciben_todos', 'Todos reciben este mensaje');

  //EJERCICIO

  //2-Se recibe cada mensaje y se pushea al array "messages", luego enviamos ese array
  //a todos los clientes, en este caso lo enviamos como un objeto con datos que luego
  //el front usara para mostrar en el cliente, como por ejemplo id de usuario y el mensaje
  socket.on('message', (data) => {
    messages.push({ socketId: socket.id, message: data });
    socketServer.emit('messages', messages);
  });
});
