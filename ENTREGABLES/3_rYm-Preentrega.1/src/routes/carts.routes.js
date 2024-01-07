//al utilizar require, necesitamos si o si importar express en todos los archivos
//De lo contrario obtendremos el error "express is not defined"
const express = require('express');
const CartManager = require('../classes/CartManager');

const cartsRouter = express.Router();
//Instanciamos la clase
const cartManager = new CartManager('../../carritos.json');

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

module.exports = cartsRouter;
