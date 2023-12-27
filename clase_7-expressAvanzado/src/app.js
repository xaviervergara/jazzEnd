//importamos express
import express from 'express';
//creamos la app
const app = express();
//permitir objetos json a traves de req.body
app.use(express.json());
//ahora se puede interpretar la url para capturar todo tipo de datos
app.use(express.urlencoded({ extended: true }));
//puerto
const PORT = 8080;

//METODO POST (agregar informacion)
//usamos let, porque luego en metodo PUT tenemos que remapear la variable
let users = [];

//convencionalmente se suele usar primero la ruta api, entendiendo que estamos trabajando con una api
app.post('/api/users', (req, res) => {
  //obtenemos el user que agregaron desde el req.body
  const user = req.body;
  //Creamos Id auto incrementable
  let id = users.length + 1;

  //si tenemos 2 usuarios, id:1 y id:2 y hacemos un DELETE del id:1
  //nos va a quedar el users.length = 1 con el usuario de id:2
  //Si hacemos otro POST id se nos va a 2 (1+1), lo cual provoca que
  //se repitan los id's. Con estas lineas prevemos eso!
  const idRepetido = users.find((user) => user.id === id);
  if (idRepetido) {
    id++;
  }

  users.push({ ...user, id });
  res.send({ status: 'Ok', message: 'Usuario Creado' });
});

app.get('/api/users', (req, res) => {
  res.send({ users });
});

//MEOTODO PUT (actualizar info)

// Para poder trabajar con PUT, no sólo enviamos el body en el request,
// sino que además mandamos por params el id, nombre, o cualquier identificador
// para que el servidor sepa qué recurso específicamente debe actualizar.

app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  //recorremos array users, buscando el usuario con el id que recibimos
  //si NO existe, retornamos error
  if (!users.some((user) => user.id === parseInt(id))) {
    return res.send({ error: 'User not found' });
  }
  //Obtenemos el usuario a modificar
  const user = req.body;
  users = users.map((u) => {
    //Si se encuentra el usuario con el Id que recibimos:
    if (u.id === parseInt(id)) {
      //Nos paramos en ese usuario, creamos un nuevo objeto
      //desestructuramos las props que ya traia (...u)
      //desestructuramos las props del usuario modificado (...users)
      //agregamos el id, para evitar que este se modifique, o se pierda cuando el usuario actualiza
      return {
        ...u,
        ...user,
        id: parseInt(id), //recordar que params viene como string
      };
    }
    //El resto de los usuarios que no entran en la condicion se mapean normalmente
    return u;
  });

  res.send({ message: 'User updated', user });
});

//METODO DELETE
// Aquí no es necesario enviar nada desde el body, sin embargo,
// sí es importante indicar en el req.params el identificador para
// que el servidor reconozca qué recurso debe eliminar.

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  //si NO existe, retornamos error
  if (!users.some((user) => user.id === parseInt(id))) {
    return res.send({ error: 'User not found' });
  }
  //+id para no usar parseInt, el + vuelve ese numero de string a dato Number
  users = users.filter((user) => user.id !== +id);
  res.send({ message: 'User deleted' });
});

// _________________________________________________________________________
//ACTIVIDAD Servidor con GET, POST, PUT, DELETE

let frase = 'Frase inicial';

// 1_________
app.get('/api/frase', (req, res) => {
  res.send({ frase });
});
// 2_________
app.get('/api/palabras/:pos', (req, res) => {
  const { pos } = req.params;
  const palabras = frase.split(' ');
  if (pos > palabras.length) {
    res.send({ error: 'Palabra inexistente' });
  }
  //NO HACE FALTA PARSEAR POS, PORQUE CON LA RESTA SE VUELVE NUMERO YA
  res.send({ buscada: palabras[pos - 1] });
});
// 3_________

app.post('/api/palabras', (req, res) => {
  const { palabra } = req.body;
  let fraseArr = frase.split(' ');
  fraseArr.push(palabra);
  //de este modo, cuando volvamos a hacer get en la ruta /api/frase, se suma la palabra del POST
  frase = fraseArr.join(' ');
  res.send({ agregada: palabra, pos: fraseArr.length });
});

// 4_________

app.put('/api/palabras/:pos', (req, res) => {
  const { pos } = req.params;
  const { palabra } = req.body;
  let fraseArr = frase.split(' ');

  if (pos > fraseArr.length) {
    return res.send({ error: 'No se encontro la palabra' });
  }

  let palabraAnterior = fraseArr[pos - 1];
  fraseArr[pos - 1] = palabra;
  frase = fraseArr.join(' ');

  res.send({ actualizada: palabra, anterior: palabraAnterior });
});

// 5_________

app.delete('/api/palabras/:pos', (req, res) => {
  const { pos } = req.params;
  let fraseArr = frase.split(' ');
  if (pos > fraseArr.length) {
    return res.send({ error: 'No se encontro la palabra' });
  }
  let palabraDelete = fraseArr[pos - 1];
  let fraseDelete = fraseArr.filter((palabra) => palabra !== palabraDelete);
  frase = fraseDelete.join(' ');

  res.send({ palabraEliminada: palabraDelete });
});

//levantamos servidor en puerto8080
app.listen(PORT, () => {
  console.log(`Server runnig on ${PORT}`);
});
