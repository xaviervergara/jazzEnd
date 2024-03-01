import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { auth } from './middleware/auth.js';

//puerto
const PORT = 8080;
//instanciamos la app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser
// app.use(cookieParser());//Cookie normal
app.use(cookieParser('C0d3rh0us3')); //cookie firmada

//public
app.use(express.static('public'));

//session middleware

app.use(
  session({
    secret: 'C0d3rh0us3', //firma
    resave: true, //guarda igual luego de un periodo de inactividad.
    saveUninitialized: true, //por mas de que la session este vacia, la guarda igual
  })
);

//    ///////////////
//   ////SESSION////
//  ///////////////

app.get('/session', (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send({
      message: `Hola ${req.session.user} bienvenido de vuelta! Se ha visitado el sitio ${req.session.counter} veces`,
    });
  } else {
    req.session.counter = 1;
    res.send({ message: `Bienvenido ${req.session.user}! ` });
  }
});

//Logout

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.send({ message: 'Logout Ok!' });
    } else {
      res.status(400).send(err);
    }
  });
});

//login

app.get('/login', (req, res) => {
  const { userName, password } = req.query; //se hace asi para ser mas agil en la demostracion pero esto se pasa todo por body, porque si se pasa asi se ve por url
  if (userName !== 'xaviervergara' || password !== 'xv123') {
    return res
      .status(401)
      .send({ message: 'Usuario o contraseña incorrectos' });
  }
  req.session.user = userName;
  req.session.password = password;
  req.session.admin = true;
  res.send({ message: 'Login success!' });
});

//    /////////////////////////
//   ////HANDLEBARS CONFIG////
//  /////////////////////////

app.engine('handlebars', handlebars.engine());
app.set('views', 'src/views');
app.set('view engine', 'handlebars');

//

//████████████████████████████████████
//█            SET COOKIES           █
//████████████████████████████████████

//(setear la cookie) Estas cookies que seteamos se guardan en el request

app.get('/setCookies', (req, res) => {
  res
    .cookie('coderCookie', 'Esto es una cookie') //{ maxAge: 15000 }
    .send({ message: 'Cookie seteada' }); //args: nombre, contenido, lifetime
});

//████████████████████████████████████
//█            GET COOKIES           █
//████████████████████████████████████

//(obtener la cookie)

app.get('/getCookies', (req, res) => {
  res.send(req.cookies); //cookies es palabra reservada propia de la libreria "cookieParser"
});

//████████████████████████████████████
//█         DELETE COOKIES           █
//████████████████████████████████████

app.get('/deleteCookies', (req, res) => {
  res.clearCookie('coderCookie').send({ message: 'Cookies borradas' });
});

//████████████████████████████████████
//█         SIGNED COOKIES           █
//████████████████████████████████████

//██████████████████
//█       SET      █
//██████████████████

app.get('/setSignedCookies', (req, res) => {
  res
    .cookie('signedCookie', 'Una cookie firmada', {
      maxAge: 10000,
      signed: true,
    })
    .send({ message: 'Cookie firmada' });
});

//██████████████████
//█       GET      █
//██████████████████

app.get('/getSignedCookies', (req, res) => {
  res.send(req.signedCookies); //signedCookies es palabra reservada propia de la libreria "cookieParser"
});

//        ////////////////
//       /////Render/////
//      ////////////////

//Ejercicio #1
//le pasamos middleware de autenticacion
app.get('/', auth, (req, res) => {
  res.render('index');
});

//setear cookie
app.post('/createCookie', (req, res) => {
  const { nombre, correo } = req.body;
  res
    .cookie('user', correo, { maxAge: 10000 })
    .send({ message: 'Cookie seteada' });
});

//Server running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
