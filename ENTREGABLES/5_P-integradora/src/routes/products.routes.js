import express from 'express';
import ProductManager from '../DAO/MongoDb/ProductManager.js'; //(MongoDB)

//instanciamos el enrutador
const productsRouter = express.Router();
//Instanciamos la clase
const productManager = new ProductManager('../../productos.json');

// GET /(CON LIMIT)
productsRouter.get('/', async (req, res) => {
  const { limit } = req.query;

  try {
    const products = await productManager.getProducts();

    //si no hay limit manda todo
    if (!limit) {
      return res.send({ products });
    }
    //si el limit es mas grande tira eror
    if (parseInt(limit) > products.length) {
      return res.status(400).send({ message: 'Error: cantidad inexistente' });
    }
    const limitedProd = products.slice(0, parseInt(limit));

    res.send({ limitedProd });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// GET /(CON PARAM ID)

productsRouter.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  try {
    //Validacion: numero mas grande de pid, error
    const products = await productManager.getProducts();
    if (+pid > products.length) {
      return res.status(400).send({ message: 'Error: producto inexistente' });
    }

    const producById = await productManager.getProductById(+pid);
    res.send({ producById });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

//POST
productsRouter.post('/', async (req, res) => {
  //DUDA: PARA QUE VALIDAR ACA? PORQUE NO SE HACE TODO EN LA CLASE
  let { title, description, code, price, available, stock, category } =
    req.body;

  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !available ||
    !stock ||
    !category
  ) {
    return res.status(400).send({ message: 'Completar todos los campos' });
  }
  let product = req.body;
  try {
    await productManager.addProduct({ ...product, status: true });
    res.status(200).send({ message: 'Producto agregado satisfactoriamente!' });
  } catch (error) {
    console.log(error);
  }
});

//PUT

productsRouter.put('/:pid', async (req, res) => {
  const { pid } = req.params;
  const products = await productManager.getProducts();
  // if (pid > products.length) {
  //   return res.status(400).send({ message: 'Error: producto inexistente' });
  // }

  if (!products.some((p) => p.id === +pid)) {
    return res.status(400).send({ message: 'Error: Id no existe' });
  }
  const productoAActualizar = req.body;
  try {
    await productManager.updateProduct(pid, productoAActualizar);
    res
      .status(400)
      .send({ message: 'Producto actualizado satisfactoriamente' });
  } catch (error) {
    console.error(`Error al actualizar producto: ${error}`);
  }
});

// DELETE

productsRouter.delete('/:pid', async (req, res) => {
  const { pid } = req.params;
  if (!pid) {
    return res.status(400).send({ message: 'Error: Id no existe' });
  }
  try {
    await productManager.deleteProduct(+pid);
    res.status(200).send({ message: 'Producto eliminado satisfactoriamente!' });
  } catch (error) {
    res.status(400).send({ message: 'Error al borrar producto' });
  }
});

// DELETE ALL (MIO)

productsRouter.delete('/', async (req, res) => {
  productManager.deleteAll();
  res.send({ message: 'products deleted' });
});

export default productsRouter;

// console.log('Directorio actual:', process.cwd());
