import { Router, urlencoded } from 'express';

//traemos la clase ProductManager
import ProductManager from '../classes/ProductManager.js';
//instanciamos la clase
const productManager = new ProductManager('../../productos.json');

//instanciamos la ruta
const viewsRouter = Router();

//VISTA DE LOS PRODUCTOS NORMAL
viewsRouter.get('/', async (req, res) => {
  //   console.log('Directorio actual:', process.cwd());
  try {
    const products = await productManager.getProducts();
    res.render('home', { products, style: 'home.css', title: 'Http Products' });
  } catch (error) {
    console.error(`Error al renderizar productos: ${error}`);
  }
});
/////////////////////////////////
const arrayProducts = [];

//////////////////////////////////

//VISTA DE LOS PRODUCTOS TIEMPO REAL
viewsRouter.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', {
    style: 'realTimeProducts.css',
    title: 'Real Time',
  });
});

viewsRouter.post('/realtimeproducts', (req, res) => {
  // console.log(req.body);
  const products = req.body;

  arrayProducts.push(products);
  console.log(arrayProducts);
  res.send({ message: 'producto agregado exitosamente!' });
});

export default viewsRouter;
