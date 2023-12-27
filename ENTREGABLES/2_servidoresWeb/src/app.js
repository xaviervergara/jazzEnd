//Importamos modulo express
const express = require('express');
//importamos la clase ProductManager
const ProductManager = require('./ProductManager');
//server
const app = express();
//puerto
const PORT = 8080;
//configurar express con la url extendida
app.use(express.urlencoded({ extended: true }));

//Instanciamos la clase productManager, que lea y escriba en esa ruta
const productManager = new ProductManager('./productos.json');

//RUTA /PRODUCTS
console.log('Directorio actual:', process.cwd());
app.get('/products', async (req, res) => {
  const { limit } = req.query;
  const products = await productManager.getProducts();
  try {
    //si no ponen el limite en la url mandar todo
    if (!limit) {
      //mandar todo siempre como objeto.
      return res.send({ products });
    }
    //acordarse de parsear, las queries y los params vienen por defecto en string
    if (parseInt(limit) === 0) {
      res.send(`Ingresar una cantidad valida`);
    }
    if (parseInt(limit) > products.length) {
      return res.send(`La cantidad de productos es ${products.length}`);
    }
    const limitedProducts = products.slice(0, parseInt(limit));
    res.send({ limitedProducts });
  } catch (error) {
    console.log(`Error de peticion: ${error}`);
  }
});

app.get('/products/:pid', async (req, res) => {
  const { pid } = req.params;
  const products = await productManager.getProducts();
  try {
    //si ingresa un id superior a los existentes:
    if (pid > products.length - 1) {
      res.send('Producto inexistente');
    }
    const filterId = await productManager.getProductById(parseInt(pid));
    res.send({ filterId });
  } catch (error) {
    console.log(error);
  }
});

// Servidor escuchando puerto 8080
app.listen(PORT, () =>
  console.log(`Servidor listo escuchando en puerto ${PORT}`)
);
