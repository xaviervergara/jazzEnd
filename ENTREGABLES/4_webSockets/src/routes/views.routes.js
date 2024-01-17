import { Router } from 'express';

//traemos la clase ProductManager
import ProductManager from '../classes/ProductManager.js';
//instanciamos la clase
const productManager = new ProductManager('../../productos.json');

//instanciamos la ruta
const viewsRouter = Router();

const personas = [{ nombre: 'xavier', apellido: 'vergara' }];

viewsRouter.get('/', async (req, res) => {
  //   console.log('Directorio actual:', process.cwd());
  try {
    const products = await productManager.getProducts();
    res.render('home', { products, style: 'index.css' });
  } catch (error) {
    console.error(`Error al renderizar productos: ${error}`);
  }
});

export default viewsRouter;
