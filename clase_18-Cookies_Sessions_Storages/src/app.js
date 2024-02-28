import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';

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

//HANDLEBARS config

app.engine('handlebars', handlebars.engine());
app.set('views', 'src/views');
app.set('view engine', 'handlebars');

//

//Render

app.get('/', (req, res) => {
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
