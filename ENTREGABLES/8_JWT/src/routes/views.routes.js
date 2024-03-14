import { Router } from 'express';

import session from 'express-session';

import { productModel } from '../DAO/models/products.models.js';

//traemos la clase ProductManager
import ProductManager from '../DAO/MongoDb/ProductManager.js';

//traemos los middlewares de autenticacion
import { checkAuth, checkExistingUser } from '../middlewares/auth.js';

//instanciamos la clase
const productManager = new ProductManager();

//instanciamos la ruta
const viewsRouter = Router();

//VISTA DE LOS PRODUCTOS NORMAL
viewsRouter.get('/', async (req, res) => {
  //   console.log('Directorio actual:', process.cwd());
  try {
    const products = await productManager.getProducts();
    // const products = await productModel.find().lean();
    res.render('home', { products, style: 'home.css', title: 'Http Products' });
  } catch (error) {
    console.error(`Error al renderizar productos: ${error}`);
  }
});

//Vista /products para la 2nda Pre-entrega

viewsRouter.get('/products', checkAuth, async (req, res) => {
  const { page } = req.query;
  try {
    const products = await productManager.getProducts(10, page); //10 es el limit, page es la pagina
    const { user } = req.session; //si inicio sesion ya podemos obtener el usuario
    res.render('products', { products, user, style: 'products.css' });
  } catch (error) {
    console.error(error);
  }
});

//  ██████████████████████████████████
//  █████████████SESSIONS█████████████
//  ██████████████████████████████████

//    /////////////
//   ////Login////
//  /////////////

viewsRouter.get('/login', checkExistingUser, (req, res) => {
  //si ya esta logueado el usuario, osea si existe ese user en la session, no puede volver al login, se lo redirecciona a la pagina de bienvenida

  res.render('login', { style: 'login.css' });
});

//    //////////////
//   ///Register///
//  //////////////

viewsRouter.get('/register', checkExistingUser, (req, res) => {
  res.render('register');
});

//    ////////////////////
//   ////Restore-pass////
//  ////////////////////

viewsRouter.get('/restore-password', checkExistingUser, (req, res) => {
  res.render('restore-password');
});

//    ///////////////////
//   ///FAIL REGISTER///
//  ///////////////////

viewsRouter.get('/failregister', (req, res) => {
  res.render('failregister');
});

//    ///////////////////
//   ////FAIL LOGIN/////
//  ///////////////////

viewsRouter.get('/failogin', (req, res) => {
  res.render('failogin');
});

//  ██████████████████████████████████
//  █████████████CHAT-APP█████████████
//  ██████████████████████████████████

viewsRouter.get('/chat', (req, res) => {
  res.render('chat', {
    title: 'Chat app',
    style: 'chat.css',
  });
});

//VISTA DE LOS PRODUCTOS TIEMPO REAL
viewsRouter.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', {
    style: 'realTimeProducts.css',
    title: 'Real Time',
  });
});

export default viewsRouter;
