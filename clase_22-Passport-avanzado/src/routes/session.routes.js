import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { tokenSecret } from '../utils/constants.js';
import { passportCall } from '../utils/passportCall.js';
import { authorization } from '../utils/authorization.js';

const sessionRoutes = Router();

//EJERCICIO Nro_1
sessionRoutes.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'xaviervergara@gmail.com' && password === '123456') {
    //CREAMOS TOKEN
    //el primer arg es el payload(email y pass), porque a partir de esos datos crea el token, el segundo arg es la firma que definimos antes
    const token = jwt.sign({ email, password, role: 'user' }, tokenSecret, {
      expiresIn: '24h',
    });
    res //se crea la cookie y se guarda el token en ella
      .cookie('coderCookieToken', token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true, //se restringe el acceso a document.cookie
      })
      .send({ message: 'User logged' }); //la cookie guarda el token.(primer arg es el nombre de la cookie y el segundo arg lo que vamos a guardar en ella)//(el maxAge esta seteado en una hora ||se setea en milisegundos||)
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
});

//RUTA PROTEGIDA, (PIDE AUTENTICACION)
//Si se hace el login correctamente, se crea la cookie con el token y queda almacenada en el navegador, y de esta manera se puede acceder posteriormente a esta ruta
//Pero si yo borro esa cookie e intento acceder a esta ruta, me va a dar un unauthoriezed

//TENER EN CUENTA EL ORDEN DE LOS MIDDLEWARES. SIEMPRE PRIMERO SE AUTENTICA, PARA OBTENER LAS CREDENCIALES DEL USUARIO Y LUEGO A PARTIR DE ESO, SE AUTORIZA AL USER CON EL ACCESO QUE LE CORRESPONDA
sessionRoutes.get(
  '/current',
  passportCall('jwt'),
  authorization('user'),
  (req, res) => {
    res.send(req.user);
  }
);

export default sessionRoutes;
