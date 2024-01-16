// SOCKET.IO CONFIG desde el cliente
//Todo esto esta en la docu de socket.io
// Creamos un socket

const socket = io();

//Emitir un evento. enviamos info al servidor desde aqui, desde el cliente
//aqui tiene que coincidir el nombre del evento con el el del lado del servidor
//Sintaxis: 'identificador' + la info que queremos mandar

// socket.emit('message', 'Hola desde cliente!');

//DESCOMENTAR PARA PROBAR//
//recibir informacion del servidor
// socket.on('recibe_uno', (data) => {
//   console.log(data);
// });

// socket.on('reciben_todos_menos_uno', (data) => {
//   console.log(data);
// });

// socket.on('reciben_todos', (data) => {
//   console.log(data);
// });

//EJERCICIO

const button = document.getElementById('sendInfo');
const input = document.getElementById('inputInfo');
const p = document.getElementById('outputInfo');

//1- cada vez que se hace click en el boton, se emite un mensaje que contiene el valor del input
//osea lo que tipeamos
button.addEventListener('click', (event) =>
  socket.emit('message', input.value)
);

//3- Escuchamos msj

//recibimos el array de mensajes y lo logueamos
socket.on('messages', (data) => (p.innerText = data));
