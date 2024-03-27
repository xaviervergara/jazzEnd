import express from 'express';
import CartManager from '../DAO/MongoDb/CartManager.js'; //MongoDb
import ProductManager from '../DAO/MongoDb/ProductManager.js'; //MongoDb
import mongoose from 'mongoose';

//instanciamos el enrutador
const cartsRouter = express.Router();
//Instanciamos la clase del carrito
const cartManager = new CartManager();
//Instanciamos la clase del productManager
const productManager = new ProductManager();

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
    const producById = await cartManager.getCartById(cid);
    if (!producById) {
      res.status(400).send({ message: 'Carrito inexistente' });
    }
    res.send(producById);
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
    const prodId = await productManager.getProductById(pid);
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

//████████████████████████████████████████
//█       DELETE PRODUCT FROM CART       █
//████████████████████████████████████████

cartsRouter.delete('/:cId/product/:pId', async (req, res) => {
  const { cId, pId } = req.params;
  try {
    const result = await cartManager.deleteProductInCart(cId, pId);

    if (result) {
      res.send({ message: 'Product deleted from cart' });
    } else {
      res.status(400).json({ message: 'Could not delete product' });
    }
  } catch (error) {
    console.error(`Error al eliminar producto del carrito: ${error}`);
  }
});

//████████████████████████████████████████
//█             PUT (new prods)          █
//████████████████████████████████████████

cartsRouter.put('/:cId', async (req, res) => {
  const { cId } = req.params;
  const newProds = req.body;

  try {
    const result = await cartManager.updateCart(cId, newProds);
    if (result.modifiedCount > 0) {
      res.send({ message: 'Cart Updated' });
    } else {
      res.status(400).send({ message: 'Could not update cart' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'Could not update cart' });
  }
});

//████████████████████████████████████████
//█          PUT (prods quantity)        █
//████████████████████████████████████████

cartsRouter.put('/:cId/products/:pId', async (req, res) => {
  const { cId, pId } = req.params;
  const { quantity } = req.body; // esto tiene que estar desestructurado ya que necesitamos la variable "quantity" del objeto body

  try {
    const result = await cartManager.updateProductInCart(cId, pId, quantity);
    if (result) {
      res.send({ message: 'Product updated' });
    } else {
      res.status(400).send({ message: 'Could not update quantity' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'Could not update quantity' });
  }
});

//████████████████████████████████████████
//█        DELETE ALL PRODS IN CART      █
//████████████████████████████████████████

cartsRouter.delete('/:cId', async (req, res) => {
  const { cId } = req.params;

  try {
    const deleted = await cartManager.deleteAllProductsInCart(cId);
    if (deleted) {
      return res.send({ message: 'Products has been deleted' });
    } else {
      return res.status(400).send({ message: 'Could not delete products' });
    }
  } catch (error) {
    console.error(error);
  }
});

export default cartsRouter;