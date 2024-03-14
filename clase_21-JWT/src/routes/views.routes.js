import { Router } from 'express';
import { checkAuth, checkExistingUser } from '../middlewares/auth.js';

const viewRoutes = Router();

//    ////////////
//   ///Inicio///
//  //////////// PAGINA DE INICIO (SIN CREDENCIALES NO SE DEBERIA PODER ENTRAR)

viewRoutes.get('/', checkAuth, (req, res) => {
  //checkAuth: Si no estas logueado, te dirije a la pagina de login asi pones las credenciales y podes acceder al index

  const { user } = req.session; //si inicio sesion ya podemos obtener el usuario
  res.render('index', user);
});

//    /////////////
//   ////Login////
//  /////////////

viewRoutes.get('/login', checkExistingUser, (req, res) => {
  //checkExistingUser: si ya esta logueado el usuario, osea si existe ese user en la session, no puede volver al login, se lo redirecciona a la pagina de bienvenida

  res.render('login');
});

//    //////////////
//   ///Register///
//  //////////////

viewRoutes.get('/register', checkExistingUser, (req, res) => {
  //checkExistingUser: si ya se creo el usuario o  ya existe te manda a index
  res.render('register');
});

//    ////////////////////
//   ////Restore-pass////
//  ////////////////////

viewRoutes.get('/restore-password', checkExistingUser, (req, res) => {
  res.render('restore-password');
});

//FAIL REGISTER

viewRoutes.get('/failregister', (req, res) => {
  res.render('failregister');
});

//FAIL LOGIN

viewRoutes.get('/failogin', (req, res) => {
  res.render('failogin');
});

export default viewRoutes;
