import { Router, urlencoded } from 'express';

import { productModel } from '../DAO/models/products.models.js';

//traemos la clase ProductManager
import ProductManager from '../DAO/MongoDb/ProductManager.js';
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

//////////////CHAT APP/////////////////
viewsRouter.get('/chat', (req, res) => {
  res.render('chat', {
    title: 'Chat app',
    style: 'chat.css',
  });
});
//EN PROCESO DE IMPLEMENTACION //INCLUIR EL EMIT DIRECTO EN EL POST
/////////////////////////////////
// const arrayProducts = [];

// viewsRouter.post('/realtimeproducts', (req, res) => {
//   // console.log(req.body);
//   const products = req.body;

//   arrayProducts.push(products);
//   console.log(arrayProducts);
//   res.send({ message: 'producto agregado exitosamente!' });
// });
//////////////////////////////////

//VISTA DE LOS PRODUCTOS TIEMPO REAL
viewsRouter.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', {
    style: 'realTimeProducts.css',
    title: 'Real Time',
  });
});

export default viewsRouter;
