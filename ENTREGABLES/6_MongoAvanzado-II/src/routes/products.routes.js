import express from 'express';
import ProductManager from '../DAO/MongoDb/ProductManager.js'; //(MongoDB)

import { productModel } from '../DAO/models/products.models.js';

//instanciamos el enrutador
const productsRouter = express.Router();
//Instanciamos la clase
const productManager = new ProductManager();

//████████████████████████████████████████
//█              GET+LIMIT               █
//████████████████████████████████████████

productsRouter.get('/', async (req, res) => {
  const { limit = 10, page = 1, query = '', sort = '' } = req.query;

  try {
    const products = await productManager.getProducts(limit, page, query, sort);

    if (products) {
      res.send(products);
    } else {
      res.status(400).send({ message: 'Products not found' });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

//████████████████████████████████████████
//█              GET+PARAM               █
//████████████████████████████████████████

productsRouter.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  try {
    const producById = await productManager.getProductById(pid);

    res.send({ producById });
  } catch (error) {
    res.status(400).send({ message: `Error en el servidor: ${error.message}` });
  }
});

//████████████████████████████████████████
//█                POST                  █
//████████████████████████████████████████

productsRouter.post('/', async (req, res) => {
  //DUDA: PARA QUE VALIDAR ACA? PORQUE NO SE HACE TODO EN LA CLASE
  let { title, description, code, price, available, stock, category } =
    req.body;
  //con mongoose esta validacion ya se hace en el schema. se conserva solo por
  //si se vuelve a usar fileSystem
  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !available ||
    !stock ||
    !category
  ) {
    return res
      .status(400)
      .send({ message: 'Error en el servidor: Completar todos los campos' });
  }

  let product = req.body;

  try {
    await productManager.addProduct({ ...product, status: true });
    res.json({
      message: `Producto agregado satisfactoriamente!`,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: `Error en el servidor: ${error.message}` });
  }
});

//████████████████████████████████████████
//█                PUT                   █
//████████████████████████████████████████

productsRouter.put('/:pid', async (req, res) => {
  const { pid } = req.params;

  const updatedProduct = req.body;
  try {
    await productManager.getProductById(pid);

    const upd = await productManager.updateProduct(pid, updatedProduct);

    if (!upd.modifiedCount) {
      return res.status(400).json({
        message: 'Could not update user | Read carefully each obj key',
      });
    }
    res.send({ message: 'Producto actualizado satisfactoriamente' });
  } catch (error) {
    res.status(404).json({ message: `Error en el servidor: ${error.message}` });
  }
});

//████████████████████████████████████████
//█               DELETE                 █
//████████████████████████████████████████

productsRouter.delete('/:pid', async (req, res) => {
  const { pid } = req.params;
  if (!pid) {
    return res
      .status(400)
      .send({ message: 'Error en el servidor: Ingresar Id' });
  }

  try {
    const exists = await productManager.getProductById(pid);

    if (exists) {
      await productManager.deleteProduct(pid);
    } else {
      return res
        .status(400)
        .json({ message: 'El producto no existe en la Bd' });
    }

    res.status(200).send({ message: 'Producto eliminado satisfactoriamente!' });
  } catch (error) {
    res.status(400).json({ message: `Error en el servidor: ${error.message}` });
  }
});

export default productsRouter;

// console.log('Directorio actual:', process.cwd());

//████████████████████████████████████████
//█                PUT                   █
//████████████████████████████████████████
