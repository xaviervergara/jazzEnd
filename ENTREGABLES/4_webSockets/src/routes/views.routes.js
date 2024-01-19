import { Router } from 'express';

//traemos la clase ProductManager
import ProductManager from '../classes/ProductManager.js';
//instanciamos la clase
const productManager = new ProductManager('../../productos.json');

//instanciamos la ruta
const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
  //   console.log('Directorio actual:', process.cwd());
  try {
    const products = await productManager.getProducts();
    res.render('home', { products, style: 'home.css' });
  } catch (error) {
    console.error(`Error al renderizar productos: ${error}`);
  }
});

viewsRouter.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { style: 'realTimeProducts.css' });
});

export default viewsRouter;
