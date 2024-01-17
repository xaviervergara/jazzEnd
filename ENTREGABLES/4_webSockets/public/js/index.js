// SOCKET.IO CONFIG desde el cliente
//Todo esto esta en la docu de socket.io
// Creamos un socket

const socket = io();

socket.emit('message', 'hola desde cliente!');
