//importar express
import express from 'express';

//traer enrutador
import viewsRouter from './routes/views.routes.js';

//importamos server de socket.io
import { Server } from 'socket.io';

//importar handlebars

import handlebars from 'express-handlebars';

//definir puerto
const PORT = 8080;

//instanciar la app
const app = express();

//definir carpeta estatica
app.use(express.static('public'));

//recibir json de body
app.use(express.json());

//recibir datos complejos de url
app.use(express.urlencoded({ extended: true }));

//montaje del enrutador
app.use('/', viewsRouter);

////////HANDLEBARS///////////
app.engine('handlebars', handlebars.engine());

//seteamos las vistas
app.set('views', 'src/views');

//seteamos cual va a ser el motor de vistas
app.set('view engine', 'handlebars');
////////FIN HANDLEBARS///////////

//servidor escuchando en 8080
//Instancia servidor con protocolo http
const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port ${8080}`);
});

//instancia de socket.io
const io = new Server(httpServer);

const messages = [];

io.on('connect', (socket) => {
  console.log(`A new client has arrived!`);

  socket.on('message', (data) => {
    messages.push(data);
    io.emit('messageLogs', messages);
  });

  socket.on('newUser', (user) => {
    io.emit('userLog', user);
    socket.broadcast.emit('notification', user);
  });
});
