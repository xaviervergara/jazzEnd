//aclaracion: previamente se ha instalado el express.js framework en node desde npm

import express from 'express';
// const express = require('express'); //usamos require por la incompatibilidad de fs con import

//instanciamos express (sin el "new", para mas información leer la docu de express.js)
const app = express();
//configurar express con la url extendida
//esto implica configurarla para poder obtener las queries
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

// En el contexto de Express.js y en el desarrollo de APIs en general,
// el término "endpoint" se refiere a un punto de acceso específico o
// una URL que está asociada con una operación particular. En otras palabras,
// un endpoint es la combinación de una ruta y un método HTTP específico.

//get siempre nos permite obtener informacion!

// app.get
app.get('/ruta', (req, res) =>
  res.send('Hola Mundo desde el auto usando express!')
);

//Ejercicio 1 (Otras respuestas con Express)

app.get('/bienvenida', (req, res) =>
  res.send('<h1 style="color:blue;">Bienvenid@s</h1>')
);
// ________

const user = {
  nombre: 'xavier',
  apellido: 'vergara',
  edad: 30,
  correo: '123@gmail.com',
  id: 0,
  genero: 'masculino',
};

app.get('/usuario', (req, res) => {
  res.send(user);
});

// ___________
//OBJETO REQUEST

app.get('/user-param/:nombre/:apellido', (req, res) => {
  const { nombre, apellido } = req.params;
  res.send(`Hola ${nombre} ${apellido}!`);
});
//la ruta deberia ser: 'localhost:8080/user-param/xavier/vergara'
// ________
//Ejemplo en vivo 2

// Dado un arreglo de objetos de tipo usuario, realizar
// un servidor en express que permita obtener dichos usuarios.
// La ruta raíz ‘/’ debe devolver todos los usuarios
// la ruta /:userId debe devolver sólo al usuario con dicho Id.

const usuarios = [
  user,
  {
    nombre: 'matias',
    apellido: 'gutierrez',
    edad: 44,
    correo: '456@gmail.com',
    id: 1,
    genero: 'masculino',
  },
  {
    nombre: 'nicolas',
    apellido: 'mendeleiev',
    edad: 14,
    correo: '789@gmail.com',
    id: 2,
    genero: 'masculino',
  },
  {
    nombre: 'magali',
    apellido: 'ibarra',
    edad: 44,
    correo: 'magali@gmail.com',
    id: 3,
    genero: 'femenino',
  },
  {
    nombre: 'pamela',
    apellido: 'mendez',
    edad: 19,
    correo: 'pandez@gmail.com',
    id: 4,
    genero: 'femenino',
  },
  {
    nombre: 'melisa',
    apellido: 'parrili',
    edad: 24,
    correo: 'melparr@gmail.com',
    id: 5,
    genero: 'femenino',
  },
];

// app.get('/', (req, res) => {
//   //se recomienda mandar todo como objetos y no como un unico array
//   // porque en el contexto de las API REST se utiliza como contenedor
//   // principal UN OBJETO, para tener la informacion organizada en key/values

//   res.send({ usuarios });
// });

// app.get('/:userId', (req, res) => {
//   //los parametros vienen por defecto en formato string
//   const { userId } = req.params;
//   //hacemos un parseInt de userId
//   const user = usuarios.find((user) => user.id === parseInt(userId));
//   if (!user) {
//     //devolver siempre formato objeto!
//     res.send({ error: 'Usuario no encontrado' });
//   }
//   res.send(user);
// });

//req.query//

//PARA CORRER ESTE EJEMPLO, COMENTAR EL GET ANTERIOR PORQUE CHOCAN
//la sintaxis de la url seria:
// http://localhost:8080/users?id=1&nombre=Xavier&email=xvergara12@gmail.com

//La ventaja de req.query es que no nos limita como los req.params
//en el sentido de que con estos ultimos nos vemos obligados a fijar la
//ruta con :id, :nombre, :email, y en cambio con query podemos pasar
//todo lo que queramos
app.get('/users', (req, res) => {
  //notese como en la ruta no ingresamos ninguna de las variables
  //como si lo haciamos usando req.params!
  const { id, nombre, email } = req.query;
  res.send(
    `El id ingresado es ${id}, el nombre es ${nombre} y su email es ${email}`
  );
});

//Ejemplo en vivo 3

app.get('/', (req, res) => {
  const { genero } = req.query;
  if (!genero) {
    //mandar siempre objetos!
    //acostumbrarse a retornar en estos casos para que no siga ejecutando
    return res.send({ usuarios });
  }

  if (genero !== 'femenino' && genero !== 'masculino') {
    return res.send({ error: 'genero inexistente' });
  }
  let filtroGenero = usuarios.filter((user) => user.genero === genero);
  res.send({ filtroGenero });
});

// Escuchar en puerto 8080
app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`));
