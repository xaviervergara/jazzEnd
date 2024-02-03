import express from 'express';
import CartManager from '../DAO/MongoDb/CartManager.js'; //MongoDb
import ProductManager from '../DAO/MongoDb/ProductManager.js'; //MongoDb

//instanciamos el enrutador
const cartsRouter = express.Router();
//Instanciamos la clase del carrito
const cartManager = new CartManager('../../../carritos.json');
//Instanciamos la clase del productManager
const productManager = new ProductManager('../../productos.json');

//GET
cartsRouter.get('/', async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.send({ carts });
  } catch (error) {
    console.log(`Error peticion get: ${error}`);
  }
});

//GET ID
cartsRouter.get('/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
    const producById = await cartManager.getCartById(parseInt(cid));
    if (!producById) {
      res.status(400).send({ message: 'Carrito inexistente' });
    }

    res.send({ producById });
  } catch (error) {
    console.log(`Error peticion get: ${error}`);
  }
});

//POST
cartsRouter.post('/', async (req, res) => {
  const cartAdded = await cartManager.addCart();

  if (!cartAdded) {
    res.status(400).send({ message: 'carrito no agregado' });
  }
  res.send({ message: 'Carrito agregado satisfactoriamente!' });
});

// POST /:cid/product/:pid

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
  console.log('Directorio actual:', process.cwd()); //TIRAR ESTA LINEA PARA UBICARSE EN DIRECTORIO
  const { cid, pid } = req.params;
  try {
    //VALIDAR QUE EL CARRITO EXISTA EN CART MANAGER
    const carts = await cartManager.getCarts();
    const cartId = carts.find((cart) => cart.id === +cid);
    if (!cartId) {
      return res
        .status(400)
        .send({ message: 'Error en peticion: cartId no inexistente' });
    }
    const prodId = await productManager.getProductById(+pid);
    //VALIDAR QUE EL PRODUCTO EXISTA EN PRODUCT MANAGER
    if (!prodId) {
      return res
        .status(400)
        .send({ message: 'Error en peticion: prodId no inexistente' });
    }

    await cartManager.addProductToCart(pid, cid);
    res.status(200).send({ message: 'Carrito actualizado satisfactoriamente' });
  } catch (error) {
    console.log(`Error de peticion: error al actualizar el carrito: ${error}`);
  }
});

//DELETE ALL

cartsRouter.delete('/', async (req, res) => {
  try {
    await cartManager.deleteAll();
    res.status(200).send({ message: 'Carritos borrados satisfactoriamente' });
  } catch (error) {
    console.log(
      `Error de peticion: error al borrar todos los carritos, ${error}`
    );
  }
});

export default cartsRouter;
