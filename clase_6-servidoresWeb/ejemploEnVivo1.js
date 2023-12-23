//traemos el modulo http nativo de node.js
const http = require('http');

//en vez de usar el puerto hardCodeado, lo guardamos en variable
const PORT = 8080;

//crear sevidor
const server = http.createServer((req, res) => {
  res.end('Hola mundo desde el backend!');
});

//el servidor escucha al puerto 8080
server.listen(PORT, () => console.log(`Servidor escuchando puerto ${PORT}`));
